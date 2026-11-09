const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  sabor: {
    type: String,
    default: ''
  },
  quantidadeFardos: {
    type: Number,
    required: true,
    min: 1
  },
  precoFardoMZN: {
    type: Number,
    required: true,
    min: 0
  },
  subtotalMZN: {
    type: Number,
    required: true,
    min: 0
  }
});

const saleSchema = new mongoose.Schema(
  {
    numeroVenda: {
      type: String,
      unique: true,
      trim: true
    },
    pedido: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    nomeCliente: {
      type: String,
      required: true,
      trim: true
    },
    telefoneCliente: {
      type: String,
      default: '',
      trim: true
    },
    itens: [saleItemSchema],
    totalFardos: {
      type: Number,
      required: true,
      min: 1
    },
    valorTotalMZN: {
      type: Number,
      required: true,
      min: 0
    },
    metodoPagamento: {
      type: String,
      enum: ['M-Pesa', 'E-Mola', 'Transferência Bancária', 'Dinheiro', 'POS / Cartão'],
      default: 'M-Pesa'
    },
    estadoPagamento: {
      type: String,
      enum: ['Pago', 'Pendente', 'A Prazo', 'Parcial'],
      default: 'Pago'
    },
    referenciaComprovativo: {
      type: String,
      default: '',
      trim: true
    },
    observacoes: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Gerador automático de código de venda ex: VEN-202611-0001
saleSchema.pre('save', async function (next) {
  if (!this.numeroVenda) {
    const data = new Date();
    const prefix = `VEN-${data.getFullYear()}${String(data.getMonth() + 1).padStart(2, '0')}`;
    const count = await mongoose.model('Sale').countDocuments();
    this.numeroVenda = `${prefix}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Sale', saleSchema);
