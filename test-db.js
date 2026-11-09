const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  console.log('A testar conexão com o MongoDB Atlas...');
  console.log('URI:', process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@'));

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('[OK] Conexão bem-sucedida!');
    console.log('Host do Cluster:', conn.connection.host);
    console.log('Base de dados:', conn.connection.name);
    console.log('Estado:', conn.connection.readyState === 1 ? 'Conectado (1)' : conn.connection.readyState);

    await mongoose.disconnect();
    console.log('Conexão finalizada com sucesso.');
    process.exit(0);
  } catch (err) {
    console.error('[ERRO] Falha na conexão com o MongoDB:');
    console.error(err.message);
    process.exit(1);
  }
}

testConnection();
