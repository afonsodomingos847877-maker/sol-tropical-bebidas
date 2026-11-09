require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Inquiry = require('./models/Inquiry');
const { produtosIniciais, clientesIniciais } = require('./seed');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir ficheiros estáticos do Website Público
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir Painel Administrativo / Dashboard
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// Rotas da API Comercial do Dashboard
app.use('/api/products', require('./routes/products'));
app.use('/api/stock', require('./routes/stock'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/dashboard/stats', require('./routes/stats'));

// Endpoint de Saúde / Conexão MongoDB
app.get('/api/status', (req, res) => {
  const mongoose = require('mongoose');
  const isConnected = mongoose.connection.readyState === 1;

  res.json({
    app: 'Sol Tropical Bebidas',
    status: 'online',
    dashboard: '/admin',
    database: {
      connected: isConnected,
      name: mongoose.connection.name || null,
      host: mongoose.connection.host || null
    },
    timestamp: new Date().toISOString()
  });
});

// Endpoint legado: Registar novo pedido / contacto
app.post('/api/inquiries', async (req, res) => {
  try {
    const { nome, telefone, produtoInteresse, mensagem } = req.body;

    const newInquiry = await Inquiry.create({
      nome,
      telefone,
      produtoInteresse,
      mensagem
    });

    res.status(201).json({
      success: true,
      message: 'Pedido registado com sucesso no MongoDB!',
      data: newInquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erro ao registar pedido',
      error: error.message
    });
  }
});

// Endpoint legado: Listar pedidos
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Auto-seed: Carregar catálogo inicial se a base de dados estiver vazia
const autoSeedIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('[AutoSeed] Base de dados vazia. A carregar os 3 produtos e 9 sabores de Sorriso...');
      for (const p of produtosIniciais) {
        await Product.create(p);
      }
      for (const c of clientesIniciais) {
        await Customer.create(c);
      }
      console.log('[AutoSeed] Catálogo e dados iniciais criados com sucesso!');
    }
  } catch (err) {
    console.error('[AutoSeed] Aviso ao verificar dados iniciais:', err.message);
  }
};

// Iniciar servidor após conectar ao MongoDB
const startServer = async () => {
  await connectDB();
  await autoSeedIfEmpty();

  const listenOnPort = (portToTry) => {
    const server = app.listen(portToTry, () => {
      console.log(`[Servidor] Sol Tropical Bebidas rodando na porta ${portToTry}`);
      console.log(`[Servidor] Website Público: http://localhost:${portToTry}`);
      console.log(`[Servidor] Painel Comercial (Dashboard): http://localhost:${portToTry}/admin`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        const nextPort = Number(portToTry) === 3000 ? 5000 : Number(portToTry) + 1;
        console.warn(`[Servidor] A porta ${portToTry} já está em uso por outra aplicação.`);
        console.log(`[Servidor] A tentar iniciar na porta alternativa ${nextPort}...`);
        listenOnPort(nextPort);
      } else {
        console.error('[Servidor] Erro ao iniciar:', err);
      }
    });
  };

  listenOnPort(PORT);
};

startServer();
