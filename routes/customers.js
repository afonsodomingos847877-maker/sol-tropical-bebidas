const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Sale = require('../models/Sale');
const Order = require('../models/Order');

// GET /api/customers - Listar clientes
router.get('/', async (req, res) => {
  try {
    const { tipo, busca } = req.query;
    const filtro = { ativo: true };

    if (tipo) filtro.tipo = tipo;
    if (busca) {
      filtro.$or = [
        { nome: new RegExp(busca, 'i') },
        { telefone: new RegExp(busca, 'i') },
        { cidade: new RegExp(busca, 'i') }
      ];
    }

    const customers = await Customer.find(filtro).sort({ totalComprasMZN: -1, createdAt: -1 });
    res.json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao listar clientes', error: error.message });
  }
});

// GET /api/customers/:id - Obter cliente e histórico
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    }

    const vendas = await Sale.find({ cliente: customer._id }).sort({ createdAt: -1 }).limit(20);
    const pedidos = await Order.find({ cliente: customer._id }).sort({ createdAt: -1 }).limit(20);

    res.json({
      success: true,
      data: {
        cliente: customer,
        vendas,
        pedidos
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao obter cliente', error: error.message });
  }
});

// POST /api/customers - Cadastrar cliente
router.post('/', async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ success: true, message: 'Cliente cadastrado com sucesso', data: customer });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Erro ao cadastrar cliente', error: error.message });
  }
});

// PUT /api/customers/:id - Atualizar cliente
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    }
    res.json({ success: true, message: 'Cliente atualizado com sucesso', data: customer });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Erro ao atualizar cliente', error: error.message });
  }
});

// DELETE /api/customers/:id - Desativar/Remover cliente
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, { ativo: false });
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    }
    res.json({ success: true, message: 'Cliente desativado com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao desativar cliente', error: error.message });
  }
});

module.exports = router;
