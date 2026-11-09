const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      trim: true,
      default: 'Cliente / Revendedor'
    },
    telefone: {
      type: String,
      trim: true
    },
    produtoInteresse: {
      type: String,
      enum: ['Sorriso', 'First Cola', 'Água Serena', 'Geral / Distribuição'],
      default: 'Geral / Distribuição'
    },
    mensagem: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['Pendente', 'Em Atendimento', 'Concluído'],
      default: 'Pendente'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
