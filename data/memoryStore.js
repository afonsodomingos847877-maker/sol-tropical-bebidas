const { produtosIniciais, clientesIniciais } = require('../seed');

// Armazenamento em memória para quando o MongoDB Atlas não estiver configurado localmente
let produtos = produtosIniciais.map((p, idx) => ({
  _id: 'prod_' + (idx + 1),
  ...p,
  createdAt: new Date()
}));

let clientes = clientesIniciais.map((c, idx) => ({
  _id: 'cli_' + (idx + 1),
  ...c,
  createdAt: new Date()
}));

let pedidos = [
  {
    _id: 'ped_1',
    numeroPedido: 'PED-202611-0001',
    nomeCliente: 'Supermercados VIP Maputo',
    telefoneCliente: '+258 84 123 4567',
    cidade: 'Maputo',
    itens: [
      { produto: 'prod_1', nome: 'Refrigerante Sorriso Tamarindo', sabor: 'Tamarindo', quantidadeFardos: 20, precoFardoMZN: 540, subtotalMZN: 10800 },
      { produto: 'prod_10', nome: 'Refrigerante First Cola', sabor: 'Cola', quantidadeFardos: 30, precoFardoMZN: 560, subtotalMZN: 16800 }
    ],
    totalFardos: 50,
    valorTotalMZN: 27600,
    estado: 'Pendente',
    origem: 'Website',
    createdAt: new Date()
  }
];

let vendas = [
  {
    _id: 'ven_1',
    numeroVenda: 'VEN-202611-0001',
    nomeCliente: 'Distribuidora Matola Centro, Lda.',
    telefoneCliente: '+258 86 987 6543',
    itens: [
      { produto: 'prod_7', nome: 'Refrigerante Sorriso Laranja', sabor: 'Laranja', quantidadeFardos: 40, precoFardoMZN: 540, subtotalMZN: 21600 },
      { produto: 'prod_11', nome: 'Água Mineral Serena', sabor: 'Natural', quantidadeFardos: 50, precoFardoMZN: 360, subtotalMZN: 18000 }
    ],
    totalFardos: 90,
    valorTotalMZN: 39600,
    metodoPagamento: 'M-Pesa',
    estadoPagamento: 'Pago',
    createdAt: new Date()
  }
];

let movimentacoes = [
  {
    _id: 'mov_1',
    produto: 'prod_1',
    tipo: 'Entrada (Produção)',
    quantidadeFardos: 150,
    stockAnterior: 0,
    stockPosterior: 150,
    motivo: 'Lote inicial de fábrica',
    responsavel: 'Administrador',
    createdAt: new Date()
  }
];

module.exports = {
  produtos,
  clientes,
  pedidos,
  vendas,
  movimentacoes
};
