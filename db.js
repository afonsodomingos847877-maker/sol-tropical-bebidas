const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignora se não puder alterar
}

const mongoose = require('mongoose');

// Desativa buffering do mongoose se não houver conexão imediata
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI;

    if (!connUri) {
      console.warn('[MongoDB] Aviso: MONGODB_URI não está definida no ficheiro .env.');
      console.log('[MongoDB] A aplicação está a operar em modo de demonstração com catálogo em memória.');
      return null;
    }

    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`[MongoDB] Conectado com sucesso: ${conn.connection.host}`);
    console.log(`[MongoDB] Base de dados ativa: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB] Aviso ao conectar à base de dados: ${error.message}`);
    console.log('[MongoDB] A aplicação continuará a funcionar com dados em memória.');
    return null;
  }
};

module.exports = connectDB;
