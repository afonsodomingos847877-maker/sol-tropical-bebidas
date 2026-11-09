const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const { marca, apenasAtivos } = req.query;
    const filtro = {};
    if (marca) filtro.marca = marca;
    if (apenasAtivos === 'true') filtro.ativo = true;

    const products = await Product.find(filtro).sort({ marca: 1, sabor: 1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao obter produtos', error: error.message });
  }
});

// GET /api/products/:id - Obter produto específico
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao obter produto', error: error.message });
  }
});

// POST /api/products - Registar novo produto
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: 'Produto criado com sucesso', data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Erro ao criar produto', error: error.message });
  }
});

// PUT /api/products/:id - Atualizar produto
router.put('/:id', async (req, res) => {
  try {
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

// DELETE /api/products/:id - Remover produto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }
    res.json({ success: true, message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao remover produto', error: error.message });
  }
});

module.exports = router;
