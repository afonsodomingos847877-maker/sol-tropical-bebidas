const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const memoryStore = require('../data/memoryStore');

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: memoryStore.pedidos.length, data: memoryStore.pedidos });
    }
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.json({ success: true, count: memoryStore.pedidos.length, data: memoryStore.pedidos });
  }
});

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { nomeCliente, telefoneCliente, cidade, itens, observacoes } = req.body;

    if (!nomeCliente || !telefoneCliente || !itens || !itens.length) {
      return res.status(400).json({ success: false, message: 'Dados incompletos' });
    }

    if (mongoose.connection.readyState !== 1) {
      const novoPedido = {
        _id: 'ped_' + Date.now(),
        numeroPedido: `PED-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2,'0')}-${String(memoryStore.pedidos.length + 1).padStart(4,'0')}`,
        nomeCliente: nomeCliente.trim(),
        telefoneCliente: telefoneCliente.trim(),
        cidade: cidade || 'Maputo',
        itens: itens.map(i => {
          const p = memoryStore.produtos.find(prod => prod._id === i.produtoId);
          return {
            produto: i.produtoId,
            nome: p ? p.nome : 'Produto',
            sabor: p ? p.sabor : '',
            quantidadeFardos: Number(i.quantidadeFardos),
            precoFardoMZN: p ? p.precoFardoMZN : 540,
            subtotalMZN: (p ? p.precoFardoMZN : 540) * Number(i.quantidadeFardos)
          };
        }),
        totalFardos: itens.reduce((a, b) => a + Number(b.quantidadeFardos), 0),
        valorTotalMZN: itens.reduce((a, b) => {
          const p = memoryStore.produtos.find(prod => prod._id === b.produtoId);
          return a + ((p ? p.precoFardoMZN : 540) * Number(b.quantidadeFardos));
        }, 0),
        estado: 'Pendente',
        origem: 'Website',
        observacoes: observacoes || '',
        createdAt: new Date()
      };

      memoryStore.pedidos.unshift(novoPedido);
      return res.status(201).json({ success: true, message: 'Pedido registado com sucesso!', data: novoPedido });
    }

    const order = await Order.create(req.body);
    res.status(201).json({ success: true, message: 'Pedido registado', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao registar pedido', error: error.message });
  }
});

// PUT /api/orders/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { estado } = req.body;
    if (mongoose.connection.readyState !== 1) {
      const p = memoryStore.pedidos.find(ped => ped._id === req.params.id);
      if (p) {
        p.estado = estado;
        return res.json({ success: true, message: `Estado atualizado para ${estado}`, data: p });
      }
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { estado }, { new: true });
    res.json({ success: true, message: `Estado atualizado para ${estado}`, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao atualizar estado' });
  }
});

module.exports = router;
