const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema(
  {
    produto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    tipo: {
      type: String,
      enum: ['Entrada (Produção)', 'Saída (Venda)', 'Ajuste / Avaria', 'Devolução'],
      required: true
    },
    quantidadeFardos: {
      type: Number,
      required: true
    },
    stockAnterior: {
      type: Number,
      required: true
    },
    stockPosterior: {
      type: Number,
      required: true
    },
    motivo: {
      type: String,
      default: '',
      trim: true
    },
    responsavel: {
      type: String,
      default: 'Administrador',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('StockMovement', stockMovementSchema);
