require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (Frontend)
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint de Saúde / Conexão MongoDB
app.get('/api/status', (req, res) => {
  const mongoose = require('mongoose');
  const isConnected = mongoose.connection.readyState === 1;

  res.json({
    app: 'Sol Tropical Bebidas',
    status: 'online',
    database: {
      connected: isConnected,
      name: mongoose.connection.name || null,
      host: mongoose.connection.host || null
    },
    timestamp: new Date().toISOString()
  });
});

// Endpoint: Registar novo pedido / contacto
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

// Endpoint: Listar pedidos
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

// Iniciar servidor após conectar ao MongoDB
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Servidor] Sol Tropical Bebidas rodando na porta ${PORT}`);
    console.log(`[Servidor] Acesse: http://localhost:${PORT}`);
  });
};

startServer();

