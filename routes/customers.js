const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const memoryStore = require('../data/memoryStore');

// GET /api/customers
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: memoryStore.clientes.length, data: memoryStore.clientes });
    }
    const customers = await Customer.find({ ativo: true }).sort({ totalComprasMZN: -1, createdAt: -1 });
    res.json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    res.json({ success: true, count: memoryStore.clientes.length, data: memoryStore.clientes });
  }
});

// POST /api/customers
router.post('/', async (req, res) => {
  try {
    const { nome, tipo, telefone, cidade, nuit } = req.body;
    if (mongoose.connection.readyState !== 1) {
      const novoCli = {
        _id: 'cli_' + Date.now(),
        nome: nome.trim(),
        tipo: tipo || 'Grossista',
        telefone: telefone.trim(),
        cidade: cidade || 'Maputo',
        nuit: nuit || '',
        totalComprasMZN: 0,
        totalPedidos: 0,
        ativo: true,
        createdAt: new Date()
      };
      memoryStore.clientes.unshift(novoCli);
      return res.status(201).json({ success: true, message: 'Cliente cadastrado com sucesso!', data: novoCli });
    }

    const customer = await Customer.create(req.body);
    res.status(201).json({ success: true, message: 'Cliente cadastrado', data: customer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao cadastrar cliente', error: error.message });
  }
});

module.exports = router;
