const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do cliente é obrigatório'],
      trim: true
    },
    tipo: {
      type: String,
      enum: ['Grossista', 'Retalhista', 'Distribuidor', 'Supermercado', 'Particular'],
      default: 'Grossista'
    },
    telefone: {
      type: String,
      required: [true, 'O telefone é obrigatório'],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    nuit: {
      type: String,
      trim: true,
      default: ''
    },
    cidade: {
      type: String,
      default: 'Maputo',
      trim: true
    },
    endereco: {
      type: String,
      default: '',
      trim: true
    },
    totalComprasMZN: {
      type: Number,
      default: 0,
      min: 0
    },
    totalPedidos: {
      type: Number,
      default: 0,
      min: 0
    },
    ativo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Customer', customerSchema);
