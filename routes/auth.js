const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Credenciais padrão (configuráveis via variáveis de ambiente)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const AUTH_SECRET = process.env.AUTH_SECRET || 'soltropical-secret-token-key-2026';

// Gerador de token simples e seguro
const generateToken = (username) => {
  const payload = `${username}:${Date.now()}`;
  const hash = crypto.createHmac('sha256', AUTH_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hash}`).toString('base64');
};

// Validador de token
const verifyToken = (token) => {
  try {
    if (!token) return false;
    const decoded = Buffer.from(token, 'base64').toString('ascii');
    const parts = decoded.split(':');
    if (parts.length < 3) return false;
    const [username, timestamp, hash] = parts;
    const expectedHash = crypto.createHmac('sha256', AUTH_SECRET).update(`${username}:${timestamp}`).digest('hex');
    return hash === expectedHash;
  } catch (e) {
    return false;
  }
};

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, introduza o utilizador e a palavra-passe.'
      });
    }

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Verificação de credenciais
    if (cleanUser === ADMIN_USER.toLowerCase() && cleanPass === ADMIN_PASSWORD) {
      const token = generateToken(cleanUser);
      return res.json({
        success: true,
        message: 'Autenticação bem-sucedida!',
        token,
        user: {
          nome: 'Administrador Comercial',
          utilizador: cleanUser,
          role: 'admin'
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro interno de autenticação.' });
  }
});

// GET /api/auth/verify
router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '') || req.query.token;

  if (verifyToken(token)) {
    return res.json({ success: true, valid: true });
  }

  return res.status(401).json({ success: false, valid: false, message: 'Sessão expirada ou inválida.' });
});

module.exports = router;
