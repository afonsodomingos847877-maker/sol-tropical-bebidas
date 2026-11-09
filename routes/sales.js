const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const memoryStore = require('../data/memoryStore');

// GET /api/sales
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const totalFaturadoMZN = memoryStore.vendas.reduce((acc, s) => acc + (s.valorTotalMZN || 0), 0);
      const totalFardosVendidos = memoryStore.vendas.reduce((acc, s) => acc + (s.totalFardos || 0), 0);
      return res.json({
        success: true,
        resumo: { totalVendasCount: memoryStore.vendas.length, totalFaturadoMZN, totalFardosVendidos },
        data: memoryStore.vendas
      });
    }

    const sales = await Sale.find().sort({ createdAt: -1 });
    const totalFaturadoMZN = sales.reduce((acc, s) => acc + (s.valorTotalMZN || 0), 0);
    const totalFardosVendidos = sales.reduce((acc, s) => acc + (s.totalFardos || 0), 0);

    res.json({
      success: true,
      resumo: { totalVendasCount: sales.length, totalFaturadoMZN, totalFardosVendidos },
      data: sales
    });
  } catch (error) {
    res.json({
      success: true,
      resumo: { totalVendasCount: memoryStore.vendas.length, totalFaturadoMZN: 0, totalFardosVendidos: 0 },
      data: memoryStore.vendas
    });
  }
});

// POST /api/sales
router.post('/', async (req, res) => {
  try {
    const { nomeCliente, telefoneCliente, itens, metodoPagamento, estadoPagamento, referenciaComprovativo, observacoes } = req.body;

    if (!nomeCliente || !itens || !itens.length) {
      return res.status(400).json({ success: false, message: 'Dados incompletos para venda' });
    }

    if (mongoose.connection.readyState !== 1) {
      let valorTotalMZN = 0;
      let totalFardos = 0;
      const itensProc = [];

      for (const item of itens) {
        const prod = memoryStore.produtos.find(p => p._id === item.produtoId);
        const qtd = Number(item.quantidadeFardos);
        const precoFardo = prod ? prod.precoFardoMZN : 540;
        const subtotal = qtd * precoFardo;

        totalFardos += qtd;
        valorTotalMZN += subtotal;

        itensProc.push({
          produto: item.produtoId,
          nome: prod ? prod.nome : 'Produto',
          sabor: prod ? prod.sabor : '',
          quantidadeFardos: qtd,
          precoFardoMZN: precoFardo,
          subtotalMZN: subtotal
        });

        // Abater stock em memória
        if (prod) {
          prod.stockFardos = Math.max(0, prod.stockFardos - qtd);
        }
      }

      const novaVenda = {
        _id: 'ven_' + Date.now(),
        numeroVenda: `VEN-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${String(memoryStore.vendas.length + 1).padStart(4,'0')}`,
        nomeCliente: nomeCliente.trim(),
        telefoneCliente: telefoneCliente || '',
        itens: itensProc,
        totalFardos,
        valorTotalMZN,
        metodoPagamento: metodoPagamento || 'M-Pesa',
        estadoPagamento: estadoPagamento || 'Pago',
        referenciaComprovativo: referenciaComprovativo || '',
        observacoes: observacoes || '',
        createdAt: new Date()
      };

      memoryStore.vendas.unshift(novaVenda);
      return res.status(201).json({ success: true, message: 'Venda registada com sucesso!', data: novaVenda });
    }

    // Fluxo normal com MongoDB
    const sale = await Sale.create(req.body);
    res.status(201).json({ success: true, message: 'Venda registada com sucesso!', data: sale });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao registar venda', error: error.message });
  }
});

module.exports = router;
