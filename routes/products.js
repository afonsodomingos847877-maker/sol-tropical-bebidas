const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const memoryStore = require('../data/memoryStore');

// GET /api/products - Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: memoryStore.produtos.length, data: memoryStore.produtos });
    }

    const { marca, apenasAtivos } = req.query;
    const filtro = {};
    if (marca) filtro.marca = marca;
    if (apenasAtivos === 'true') filtro.ativo = true;

    const products = await Product.find(filtro).sort({ marca: 1, sabor: 1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.json({ success: true, count: memoryStore.produtos.length, data: memoryStore.produtos });
  }
});

// GET /api/products/:id - Obter produto específico
router.get('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const prod = memoryStore.produtos.find(p => p._id === req.params.id);
      if (!prod) return res.status(404).json({ success: false, message: 'Produto não encontrado' });
      return res.json({ success: true, data: prod });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    const prod = memoryStore.produtos.find(p => p._id === req.params.id);
    if (prod) return res.json({ success: true, data: prod });
    res.status(500).json({ success: false, message: 'Erro ao obter produto', error: error.message });
  }
});

// PUT /api/products/:id - Atualizar preço do produto
router.put('/:id', async (req, res) => {
  try {
    const { precoFardoMZN, precoUnitarioMZN } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const prod = memoryStore.produtos.find(p => p._id === req.params.id);
      if (prod) {
        if (precoFardoMZN !== undefined) prod.precoFardoMZN = Number(precoFardoMZN);
        if (precoUnitarioMZN !== undefined) prod.precoUnitarioMZN = Number(precoUnitarioMZN);
        return res.json({ success: true, message: 'Preço atualizado em memória', data: prod });
      }
      return res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }
    res.json({ success: true, message: 'Produto atualizado', data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Erro ao atualizar produto', error: error.message });
  }
});

module.exports = router;
