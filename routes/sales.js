const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

// GET /api/sales - Listar todas as vendas
router.get('/', async (req, res) => {
  try {
    const { metodoPagamento, estadoPagamento, busca } = req.query;
    const filtro = {};

    if (metodoPagamento) filtro.metodoPagamento = metodoPagamento;
    if (estadoPagamento) filtro.estadoPagamento = estadoPagamento;
    if (busca) {
      filtro.$or = [
        { numeroVenda: new RegExp(busca, 'i') },
        { nomeCliente: new RegExp(busca, 'i') },
        { telefoneCliente: new RegExp(busca, 'i') }
      ];
    }

    const sales = await Sale.find(filtro).sort({ createdAt: -1 });

    const totalFaturadoMZN = sales.reduce((acc, s) => acc + (s.valorTotalMZN || 0), 0);
    const totalFardosVendidos = sales.reduce((acc, s) => acc + (s.totalFardos || 0), 0);

    res.json({
      success: true,
      resumo: {
        totalVendasCount: sales.length,
        totalFaturadoMZN,
        totalFardosVendidos
      },
      data: sales
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao listar vendas', error: error.message });
  }
});

// GET /api/sales/:id - Obter venda detalhada
router.get('/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('cliente');
    if (!sale) {
      return res.status(404).json({ success: false, message: 'Venda não encontrada' });
    }
    res.json({ success: true, data: sale });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao obter venda', error: error.message });
  }
});

// POST /api/sales - Registar nova venda por grosso (com baixa automática de stock)
router.post('/', async (req, res) => {
  try {
    const {
      clienteId,
      nomeCliente,
      telefoneCliente,
      pedidoId,
      itens,
      metodoPagamento,
      estadoPagamento,
      referenciaComprovativo,
      observacoes
    } = req.body;

    if (!nomeCliente || !itens || !itens.length) {
      return res.status(400).json({
        success: false,
        message: 'Nome do cliente e pelo menos um item são obrigatórios'
      });
    }

    // 1. Validar disponibilidade de stock para todos os itens primeiro
    for (const item of itens) {
      const prod = await Product.findById(item.produtoId);
      if (!prod) {
        return res.status(404).json({
          success: false,
          message: `Produto ${item.produtoId} não encontrado no catálogo`
        });
      }
      const qtd = Number(item.quantidadeFardos);
      if (prod.stockFardos < qtd) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente para "${prod.nome}". Disponível: ${prod.stockFardos} fardos. Solicitado: ${qtd} fardos.`
        });
      }
    }

    // 2. Processar itens, calcular totais e abater stock
    let valorTotalMZN = 0;
    let totalFardos = 0;
    const itensProcessados = [];

    for (const item of itens) {
      const prod = await Product.findById(item.produtoId);
      const qtd = Number(item.quantidadeFardos);
      const precoFardo = Number(item.precoFardoMZN || prod.precoFardoMZN);
      const subtotal = qtd * precoFardo;

      totalFardos += qtd;
      valorTotalMZN += subtotal;

      itensProcessados.push({
        produto: prod._id,
        nome: prod.nome,
        sabor: prod.sabor,
        quantidadeFardos: qtd,
        precoFardoMZN: precoFardo,
        subtotalMZN: subtotal
      });

      // Abater stock
      const stockAnterior = prod.stockFardos;
      prod.stockFardos = Math.max(0, stockAnterior - qtd);
      await prod.save();

      // Registar movimentação de saída
      await StockMovement.create({
        produto: prod._id,
        tipo: 'Saída (Venda)',
        quantidadeFardos: qtd,
        stockAnterior,
        stockPosterior: prod.stockFardos,
        motivo: `Venda registada para ${nomeCliente}`,
        responsavel: 'Administrador'
      });
    }

    // 3. Vincular ou localizar cliente
    let clienteRef = clienteId || null;
    if (!clienteRef && telefoneCliente) {
      const existingCust = await Customer.findOne({ telefone: telefoneCliente.trim() });
      if (existingCust) {
        clienteRef = existingCust._id;
      }
    }

    // 4. Criar venda
    const sale = await Sale.create({
      pedido: pedidoId || null,
      cliente: clienteRef,
      nomeCliente: nomeCliente.trim(),
      telefoneCliente: (telefoneCliente || '').trim(),
      itens: itensProcessados,
      totalFardos,
      valorTotalMZN,
      metodoPagamento: metodoPagamento || 'M-Pesa',
      estadoPagamento: estadoPagamento || 'Pago',
      referenciaComprovativo: referenciaComprovativo || '',
      observacoes: observacoes || ''
    });

    // 5. Se o cliente estiver cadastrado, atualizar total de compras
    if (clienteRef) {
      await Customer.findByIdAndUpdate(clienteRef, {
        $inc: {
          totalComprasMZN: valorTotalMZN,
          totalPedidos: 1
        }
      });
    }

    // 6. Se veio de um pedido, atualizar status para 'Entregue'
    if (pedidoId) {
      await Order.findByIdAndUpdate(pedidoId, { estado: 'Entregue' });
    }

    res.status(201).json({
      success: true,
      message: 'Venda registada com sucesso e stock atualizado!',
      data: sale
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao registar venda', error: error.message });
  }
});

module.exports = router;
