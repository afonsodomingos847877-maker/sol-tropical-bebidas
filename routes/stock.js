const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');

// GET /api/stock - Resumo do stock de todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ ativo: true }).sort({ stockFardos: 1 });
    
    const totalFardos = products.reduce((acc, p) => acc + (p.stockFardos || 0), 0);
    const produtosCriticos = products.filter(p => p.stockFardos <= p.stockMinimoFardos);

    res.json({
      success: true,
      resumo: {
        totalFardos,
        totalProdutos: products.length,
        produtosCriticosCount: produtosCriticos.length
      },
      produtos: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao obter stock', error: error.message });
  }
});

// GET /api/stock/alerts - Produtos com stock baixo ou esgotado
router.get('/alerts', async (req, res) => {
  try {
    const products = await Product.find({ ativo: true });
    const alerts = products.filter(p => p.stockFardos <= p.stockMinimoFardos);
    res.json({ success: true, count: alerts.length, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao verificar alertas de stock', error: error.message });
  }
});

// GET /api/stock/movements - Histórico de movimentações
router.get('/movements', async (req, res) => {
  try {
    const movements = await StockMovement.find()
      .populate('produto', 'nome marca sabor capacidade codigo')
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ success: true, count: movements.length, data: movements });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao obter movimentações', error: error.message });
  }
});

// POST /api/stock/move - Registar entrada, saída ou ajuste de stock
router.post('/move', async (req, res) => {
  try {
    const { produtoId, tipo, quantidadeFardos, motivo, responsavel } = req.body;

    if (!produtoId || !tipo || !quantidadeFardos) {
      return res.status(400).json({ success: false, message: 'Produto, tipo e quantidade são obrigatórios' });
    }

    const product = await Product.findById(produtoId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado' });
    }

    const qtd = Number(quantidadeFardos);
    if (isNaN(qtd) || qtd <= 0) {
      return res.status(400).json({ success: false, message: 'Quantidade de fardos inválida' });
    }

    const stockAnterior = product.stockFardos;
    let stockPosterior = stockAnterior;

    if (tipo.startsWith('Entrada') || tipo === 'Devolução') {
      stockPosterior = stockAnterior + qtd;
    } else if (tipo.startsWith('Saída') || tipo === 'Ajuste / Avaria') {
      if (stockAnterior < qtd && !tipo.startsWith('Ajuste')) {
        return res.status(400).json({
          success: false,
          message: `Stock insuficiente. Disponível: ${stockAnterior} fardos.`
        });
      }
      stockPosterior = Math.max(0, stockAnterior - qtd);
    }

    // Atualizar stock do produto
    product.stockFardos = stockPosterior;
    await product.save();

    // Registar movimentação no log
    const movement = await StockMovement.create({
      produto: product._id,
      tipo,
      quantidadeFardos: qtd,
      stockAnterior,
      stockPosterior,
      motivo: motivo || 'Movimentação manual via Dashboard',
      responsavel: responsavel || 'Administrador'
    });

    res.status(201).json({
      success: true,
      message: 'Movimentação de stock registada com sucesso',
      data: {
        movement,
        stockAtualizado: product.stockFardos
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao registar movimentação', error: error.message });
  }
});

module.exports = router;
