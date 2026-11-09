const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do produto é obrigatório'],
      trim: true
    },
    marca: {
      type: String,
      enum: ['Sorriso', 'First Cola', 'Água Serena'],
      required: true
    },
    codigo: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true
    },
    sabor: {
      type: String,
      default: 'Original',
      trim: true
    },
    capacidade: {
      type: String,
      default: '350ml',
      trim: true
    },
    unidadesPorFardo: {
      type: Number,
      default: 24
    },
    precoFardoMZN: {
      type: Number,
      required: [true, 'O preço por fardo é obrigatório'],
      min: 0
    },
    precoUnitarioMZN: {
      type: Number,
      default: 0,
      min: 0
    },
    stockFardos: {
      type: Number,
      default: 0,
      min: 0
    },
    stockMinimoFardos: {
      type: Number,
      default: 20,
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

// Virtual para calcular se o stock está em nível crítico
productSchema.virtual('statusStock').get(function () {
  if (this.stockFardos <= 0) return 'Esgotado';
  if (this.stockFardos <= this.stockMinimoFardos) return 'Baixo';
  return 'Normal';
});

productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);
