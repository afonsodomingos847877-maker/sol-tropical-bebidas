const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Customer = require('../models/Customer');

// GET /api/dashboard/stats - Estatísticas consolidadas para o Dashboard
router.get('/', async (req, res) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Vendas totais e hoje
    const todasVendas = await Sale.find();
    const totalFaturadoMZN = todasVendas.reduce((acc, s) => acc + (s.valorTotalMZN || 0), 0);
    const totalFardosVendidos = todasVendas.reduce((acc, s) => acc + (s.totalFardos || 0), 0);

    const vendasHoje = todasVendas.filter(s => new Date(s.createdAt) >= hoje);
    const faturadoHojeMZN = vendasHoje.reduce((acc, s) => acc + (s.valorTotalMZN || 0), 0);

    // Pedidos
    const totalPedidos = await Order.countDocuments();
    const pedidosPendentes = await Order.countDocuments({ estado: { $in: ['Pendente', 'Confirmado', 'Em Preparação'] } });

    // Stock
    const produtos = await Product.find({ ativo: true });
    const stockTotalFardos = produtos.reduce((acc, p) => acc + (p.stockFardos || 0), 0);
    const produtosCriticos = produtos.filter(p => p.stockFardos <= p.stockMinimoFardos);

    // Clientes
    const totalClientes = await Customer.countDocuments({ ativo: true });

    // Últimas transações
    const ultimasVendas = await Sale.find().sort({ createdAt: -1 }).limit(5);
    const ultimosPedidos = await Order.find().sort({ createdAt: -1 }).limit(5);

    // Contagem por Marca (Sorriso, First Cola, Água Serena)
    const stockPorMarca = {
      'Sorriso': produtos.filter(p => p.marca === 'Sorriso').reduce((a, b) => a + b.stockFardos, 0),
      'First Cola': produtos.filter(p => p.marca === 'First Cola').reduce((a, b) => a + b.stockFardos, 0),
      'Água Serena': produtos.filter(p => p.marca === 'Água Serena').reduce((a, b) => a + b.stockFardos, 0)
    };

    res.json({
      success: true,
      kpis: {
        totalFaturadoMZN,
        faturadoHojeMZN,
        totalFardosVendidos,
        pedidosPendentes,
        totalPedidos,
        stockTotalFardos,
        produtosCriticosCount: produtosCriticos.length,
        totalClientes
      },
      stockPorMarca,
      produtosCriticos,
      ultimasVendas,
      ultimosPedidos
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao gerar métricas do Dashboard', error: error.message });
  }
});

module.exports = router;
