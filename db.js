const dns = require('dns');
// Garante resolução de registos SRV do MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignora se não puder alterar
}

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI;

    if (!connUri) {
      throw new Error('A variável MONGODB_URI não está definida no ficheiro .env');
    }

    const conn = await mongoose.connect(connUri);

    console.log(`[MongoDB] Conectado com sucesso: ${conn.connection.host}`);
    console.log(`[MongoDB] Base de dados ativa: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Erro ao conectar à base de dados: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
