require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Product = require('./models/Product');
const Customer = require('./models/Customer');
const Order = require('./models/Order');
const Sale = require('./models/Sale');
const StockMovement = require('./models/StockMovement');

const produtosIniciais = [
  // 9 Sabores de Refrigerantes Sorriso
  {
    nome: 'Refrigerante Sorriso Tamarindo',
    marca: 'Sorriso',
    codigo: 'SOR-TAM-350',
    sabor: 'Tamarindo',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 540,
    precoUnitarioMZN: 25,
    stockFardos: 150,
    stockMinimoFardos: 30
  },
  {
    nome: 'Refrigerante Sorriso Maçã Verde',
    marca: 'Sorriso',
    codigo: 'SOR-MAC-350',
    sabor: 'Maçã Verde',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 540,
    precoUnitarioMZN: 25,
    stockFardos: 120,
    stockMinimoFardos: 30
  },
  {
    nome: 'Refrigerante Sorriso Ananás',
    marca: 'Sorriso',
    codigo: 'SOR-ANA-350',
    sabor: 'Ananás',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 540,
    precoUnitarioMZN: 25,
    stockFardos: 180,
    stockMinimoFardos: 30
  },
  {
    nome: 'Refrigerante Sorriso Limão',
    marca: 'Sorriso',
    codigo: 'SOR-LIM-350',
    sabor: 'Limão',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 540,
    precoUnitarioMZN: 25,
    stockFardos: 95,
    stockMinimoFardos: 25
  },
  {
    nome: 'Refrigerante Sorriso Maracujá',
    marca: 'Sorriso',
    codigo: 'SOR-MAR-350',
    sabor: 'Maracujá',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 540,
    precoUnitarioMZN: 25,
    stockFardos: 140,
    stockMinimoFardos: 30
  },
  {
    nome: 'Refrigerante Sorriso Uva',
    marca: 'Sorriso',
    codigo: 'SOR-UVA-350',
    sabor: 'Uva',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 540,
    precoUnitarioMZN: 25,
    stockFardos: 110,
    stockMinimoFardos: 25
  },
  {
    nome: 'Refrigerante Sorriso Laranja',
    marca: 'Sorriso',
    codigo: 'SOR-LAR-350',
    sabor: 'Laranja',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 540,
    precoUnitarioMZN: 25,
    stockFardos: 210,
    stockMinimoFardos: 35
  },
  {
    nome: 'Refrigerante Sorriso Maçã & Canela',
    marca: 'Sorriso',
    codigo: 'SOR-CAN-350',
    sabor: 'Maçã & Canela',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 540,
    precoUnitarioMZN: 25,
    stockFardos: 60,
    stockMinimoFardos: 25
  },
  {
    nome: 'Refrigerante Sorriso Morango',
    marca: 'Sorriso',
    codigo: 'SOR-MOR-350',
    sabor: 'Morango',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 540,
    precoUnitarioMZN: 25,
    stockFardos: 165,
    stockMinimoFardos: 30
  },
  // First Cola
  {
    nome: 'Refrigerante First Cola',
    marca: 'First Cola',
    codigo: 'COLA-350',
    sabor: 'Cola Tradicional',
    capacidade: '350ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 560,
    precoUnitarioMZN: 27,
    stockFardos: 250,
    stockMinimoFardos: 40
  },
  // Água Serena
  {
    nome: 'Água Mineral Serena',
    marca: 'Água Serena',
    codigo: 'AGUA-500',
    sabor: 'Natural',
    capacidade: '500ml',
    unidadesPorFardo: 24,
    precoFardoMZN: 360,
    precoUnitarioMZN: 18,
    stockFardos: 320,
    stockMinimoFardos: 50
  }
];

const clientesIniciais = [
  {
    nome: 'Supermercados VIP Maputo',
    tipo: 'Supermercado',
    telefone: '+258 84 123 4567',
    email: 'compras@vipmaputo.co.mz',
    nuit: '400123456',
    cidade: 'Maputo',
    endereco: 'Av. Eduardo Mondlane, nº 1420',
    totalComprasMZN: 54000,
    totalPedidos: 4
  },
  {
    nome: 'Distribuidora Matola Centro, Lda.',
    tipo: 'Grossista',
    telefone: '+258 86 987 6543',
    email: 'geral@distmatola.co.mz',
    nuit: '400789012',
    cidade: 'Matola',
    endereco: 'Zona Industrial da Matola',
    totalComprasMZN: 128500,
    totalPedidos: 8
  },
  {
    nome: 'Mercearia & Depósito Tropical',
    tipo: 'Retalhista',
    telefone: '+258 87 555 4321',
    email: 'deposito.tropical@gmail.com',
    nuit: '400555666',
    cidade: 'Marracuene',
    endereco: 'Mercado Central de Marracuene',
    totalComprasMZN: 28400,
    totalPedidos: 3
  }
];

async function seedData() {
  try {
    await connectDB();
    console.log('[Seed] A iniciar carregamento dos dados iniciais...');

    // Produtos
    for (const prod of produtosIniciais) {
      const existe = await Product.findOne({ codigo: prod.codigo });
      if (!existe) {
        await Product.create(prod);
        console.log(`[Seed] Produto criado: ${prod.nome}`);
      } else {
        console.log(`[Seed] Produto já existe: ${prod.nome}`);
      }
    }

    // Clientes
    for (const cli of clientesIniciais) {
      const existe = await Customer.findOne({ telefone: cli.telefone });
      if (!existe) {
        await Customer.create(cli);
        console.log(`[Seed] Cliente criado: ${cli.nome}`);
      }
    }

    console.log('[Seed] Concluído com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Erro ao carregar dados:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedData();
}

module.exports = { seedData, produtosIniciais, clientesIniciais };
