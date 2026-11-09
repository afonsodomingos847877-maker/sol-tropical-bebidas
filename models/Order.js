const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
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

const orderSchema = new mongoose.Schema(
  {
    numeroPedido: {
      type: String,
      unique: true,
      trim: true
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
      required: true,
      trim: true
    },
    cidade: {
      type: String,
      default: 'Maputo',
      trim: true
    },
    itens: [orderItemSchema],
    totalFardos: {
      type: Number,
      default: 0
    },
    valorTotalMZN: {
      type: Number,
      required: true,
      min: 0
    },
    estado: {
      type: String,
      enum: ['Pendente', 'Confirmado', 'Em Preparação', 'Pronto para Entrega', 'Entregue', 'Cancelado'],
      default: 'Pendente'
    },
    origem: {
      type: String,
      enum: ['Website', 'WhatsApp', 'Balcão / Presencial', 'Telefone'],
      default: 'Balcão / Presencial'
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

// Gerador automático de código de pedido ex: PED-202611-0001
orderSchema.pre('save', async function (next) {
  if (!this.numeroPedido) {
    const data = new Date();
    const prefix = `PED-${data.getFullYear()}${String(data.getMonth() + 1).padStart(2, '0')}`;
    const count = await mongoose.model('Order').countDocuments();
    this.numeroPedido = `${prefix}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
