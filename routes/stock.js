const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const StockMovement = require('../models/StockMovement');
const memoryStore = require('../data/memoryStore');

// GET /api/stock - Resumo do stock
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const totalFardos = memoryStore.produtos.reduce((acc, p) => acc + (p.stockFardos || 0), 0);
      const criticos = memoryStore.produtos.filter(p => p.stockFardos <= p.stockMinimoFardos);
      return res.json({
        success: true,
        resumo: {
          totalFardos,
          totalProdutos: memoryStore.produtos.length,
          produtosCriticosCount: criticos.length
        },
        produtos: memoryStore.produtos
      });
    }

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
    const totalFardos = memoryStore.produtos.reduce((acc, p) => acc + (p.stockFardos || 0), 0);
    const criticos = memoryStore.produtos.filter(p => p.stockFardos <= p.stockMinimoFardos);
    res.json({
      success: true,
      resumo: { totalFardos, totalProdutos: memoryStore.produtos.length, produtosCriticosCount: criticos.length },
      produtos: memoryStore.produtos
    });
  }
});

// POST /api/stock/move - Movimentação de stock
router.post('/move', async (req, res) => {
  try {
    const { produtoId, tipo, quantidadeFardos, motivo, responsavel } = req.body;
    const qtd = Number(quantidadeFardos);

    if (mongoose.connection.readyState !== 1) {
      const prod = memoryStore.produtos.find(p => p._id === produtoId);
      if (!prod) return res.status(404).json({ success: false, message: 'Produto não encontrado' });

      const stockAnterior = prod.stockFardos;
      let stockPosterior = stockAnterior;

      if (tipo.startsWith('Entrada') || tipo === 'Devolução') {
        stockPosterior = stockAnterior + qtd;
      } else {
        stockPosterior = Math.max(0, stockAnterior - qtd);
      }

      prod.stockFardos = stockPosterior;
      const mov = {
        _id: 'mov_' + Date.now(),
        produto: prod,
        tipo,
        quantidadeFardos: qtd,
        stockAnterior,
        stockPosterior,
        motivo: motivo || 'Movimentação manual via Dashboard',
        responsavel: responsavel || 'Administrador',
        createdAt: new Date()
      };
      memoryStore.movimentacoes.unshift(mov);

      return res.status(201).json({
        success: true,
        message: 'Movimentação de stock registada com sucesso',
        data: { movement: mov, stockAtualizado: prod.stockFardos }
      });
    }

    const product = await Product.findById(produtoId);
    if (!product) return res.status(404).json({ success: false, message: 'Produto não encontrado' });

    const stockAnterior = product.stockFardos;
    let stockPosterior = stockAnterior;

    if (tipo.startsWith('Entrada') || tipo === 'Devolução') {
      stockPosterior = stockAnterior + qtd;
    } else {
      stockPosterior = Math.max(0, stockAnterior - qtd);
    }

    product.stockFardos = stockPosterior;
    await product.save();

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
      message: 'Movimentação registada com sucesso',
      data: { movement, stockAtualizado: product.stockFardos }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao registar movimentação', error: error.message });
  }
});

module.exports = router;
