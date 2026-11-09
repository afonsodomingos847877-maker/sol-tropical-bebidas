const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// GET /api/orders - Listar pedidos
router.get('/', async (req, res) => {
  try {
    const { estado, origem, busca } = req.query;
    const filtro = {};

    if (estado) filtro.estado = estado;
    if (origem) filtro.origem = origem;
    if (busca) {
      filtro.$or = [
        { numeroPedido: new RegExp(busca, 'i') },
        { nomeCliente: new RegExp(busca, 'i') },
        { telefoneCliente: new RegExp(busca, 'i') }
      ];
    }

    const orders = await Order.find(filtro).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao listar pedidos', error: error.message });
  }
});

// GET /api/orders/:id - Obter pedido detalhado
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao obter pedido', error: error.message });
  }
});

// POST /api/orders - Criar novo pedido
router.post('/', async (req, res) => {
  try {
    const { clienteId, nomeCliente, telefoneCliente, cidade, itens, origem, observacoes } = req.body;

    if (!nomeCliente || !telefoneCliente || !itens || !itens.length) {
      return res.status(400).json({
        success: false,
        message: 'Nome do cliente, telefone e pelo menos um item são obrigatórios'
      });
    }

    // Processar itens e calcular totais
    let valorTotalMZN = 0;
    let totalFardos = 0;
    const itensProcessados = [];

    for (const item of itens) {
      const prod = await Product.findById(item.produtoId);
      if (!prod) {
        return res.status(404).json({
          success: false,
          message: `Produto ${item.produtoId} não encontrado`
        });
      }

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
    }

    // Se tiver cliente cadastrado ou por telefone
    let clienteRef = clienteId || null;
    if (!clienteRef && telefoneCliente) {
      const existingCust = await Customer.findOne({ telefone: telefoneCliente.trim() });
      if (existingCust) {
        clienteRef = existingCust._id;
      }
    }

    const order = await Order.create({
      cliente: clienteRef,
      nomeCliente: nomeCliente.trim(),
      telefoneCliente: telefoneCliente.trim(),
      cidade: cidade || 'Maputo',
      itens: itensProcessados,
      totalFardos,
      valorTotalMZN,
      estado: req.body.estado || 'Pendente',
      origem: origem || 'Balcão / Presencial',
      observacoes: observacoes || ''
    });

    // Se cliente existir, incrementa totalPedidos
    if (clienteRef) {
      await Customer.findByIdAndUpdate(clienteRef, { $inc: { totalPedidos: 1 } });
    }

    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao criar pedido', error: error.message });
  }
});

// PUT /api/orders/:id/status - Atualizar estado do pedido
router.put('/:id/status', async (req, res) => {
  try {
    const { estado } = req.body;
    const estadosValidos = ['Pendente', 'Confirmado', 'Em Preparação', 'Pronto para Entrega', 'Entregue', 'Cancelado'];

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ success: false, message: 'Estado inválido' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }

    res.json({
      success: true,
      message: `Estado do pedido atualizado para ${estado}`,
      data: order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao atualizar estado', error: error.message });
  }
});

module.exports = router;
