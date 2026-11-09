/**
 * Sol Tropical Bebidas — Painel Comercial & Dashboard
 * Gestão de Pedidos, Stock, Vendas por Grosso, Produtos e Clientes
 */

// Catálogo Padrão (Sorriso 9 sabores, First Cola e Água Serena)
const defaultProducts = [
  { _id: 'p1', codigo: 'SOR-TAM-350', nome: 'Refrigerante Sorriso Tamarindo', marca: 'Sorriso', sabor: 'Tamarindo', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 540, precoUnitarioMZN: 25, stockFardos: 150, stockMinimoFardos: 30, ativo: true },
  { _id: 'p2', codigo: 'SOR-MAC-350', nome: 'Refrigerante Sorriso Maçã Verde', marca: 'Sorriso', sabor: 'Maçã Verde', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 540, precoUnitarioMZN: 25, stockFardos: 120, stockMinimoFardos: 30, ativo: true },
  { _id: 'p3', codigo: 'SOR-ANA-350', nome: 'Refrigerante Sorriso Ananás', marca: 'Sorriso', sabor: 'Ananás', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 540, precoUnitarioMZN: 25, stockFardos: 180, stockMinimoFardos: 30, ativo: true },
  { _id: 'p4', codigo: 'SOR-LIM-350', nome: 'Refrigerante Sorriso Limão', marca: 'Sorriso', sabor: 'Limão', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 540, precoUnitarioMZN: 25, stockFardos: 95, stockMinimoFardos: 25, ativo: true },
  { _id: 'p5', codigo: 'SOR-MAR-350', nome: 'Refrigerante Sorriso Maracujá', marca: 'Sorriso', sabor: 'Maracujá', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 540, precoUnitarioMZN: 25, stockFardos: 140, stockMinimoFardos: 30, ativo: true },
  { _id: 'p6', codigo: 'SOR-UVA-350', nome: 'Refrigerante Sorriso Uva', marca: 'Sorriso', sabor: 'Uva', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 540, precoUnitarioMZN: 25, stockFardos: 110, stockMinimoFardos: 25, ativo: true },
  { _id: 'p7', codigo: 'SOR-LAR-350', nome: 'Refrigerante Sorriso Laranja', marca: 'Sorriso', sabor: 'Laranja', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 540, precoUnitarioMZN: 25, stockFardos: 210, stockMinimoFardos: 35, ativo: true },
  { _id: 'p8', codigo: 'SOR-CAN-350', nome: 'Refrigerante Sorriso Maçã & Canela', marca: 'Sorriso', sabor: 'Maçã & Canela', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 540, precoUnitarioMZN: 25, stockFardos: 60, stockMinimoFardos: 25, ativo: true },
  { _id: 'p9', codigo: 'SOR-MOR-350', nome: 'Refrigerante Sorriso Morango', marca: 'Sorriso', sabor: 'Morango', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 540, precoUnitarioMZN: 25, stockFardos: 165, stockMinimoFardos: 30, ativo: true },
  { _id: 'p10', codigo: 'COLA-350', nome: 'Refrigerante First Cola', marca: 'First Cola', sabor: 'Cola Tradicional', capacidade: '350ml', unidadesPorFardo: 24, precoFardoMZN: 560, precoUnitarioMZN: 27, stockFardos: 250, stockMinimoFardos: 40, ativo: true },
  { _id: 'p11', codigo: 'AGUA-500', nome: 'Água Mineral Serena', marca: 'Água Serena', sabor: 'Natural', capacidade: '500ml', unidadesPorFardo: 24, precoFardoMZN: 360, precoUnitarioMZN: 18, stockFardos: 320, stockMinimoFardos: 50, ativo: true }
];

const defaultCustomers = [
  { _id: 'c1', nome: 'Supermercados VIP Maputo', tipo: 'Supermercado', telefone: '+258 84 123 4567', cidade: 'Maputo', totalComprasMZN: 54000, totalPedidos: 4 },
  { _id: 'c2', nome: 'Distribuidora Matola Centro, Lda.', tipo: 'Grossista', telefone: '+258 86 987 6543', cidade: 'Matola', totalComprasMZN: 128500, totalPedidos: 8 },
  { _id: 'c3', nome: 'Mercearia & Depósito Tropical', tipo: 'Retalhista', telefone: '+258 87 555 4321', cidade: 'Marracuene', totalComprasMZN: 28400, totalPedidos: 3 }
];

const defaultOrders = [
  {
    _id: 'ped_1',
    numeroPedido: 'PED-202611-0001',
    nomeCliente: 'Supermercados VIP Maputo',
    telefoneCliente: '+258 84 123 4567',
    cidade: 'Maputo',
    itens: [
      { produto: 'p1', nome: 'Refrigerante Sorriso Tamarindo', sabor: 'Tamarindo', quantidadeFardos: 20, precoFardoMZN: 540, subtotalMZN: 10800 },
      { produto: 'p10', nome: 'Refrigerante First Cola', sabor: 'Cola', quantidadeFardos: 30, precoFardoMZN: 560, subtotalMZN: 16800 }
    ],
    totalFardos: 50,
    valorTotalMZN: 27600,
    estado: 'Pendente',
    createdAt: new Date().toISOString()
  }
];

const defaultSales = [
  {
    _id: 'ven_1',
    numeroVenda: 'VEN-202611-0001',
    nomeCliente: 'Distribuidora Matola Centro, Lda.',
    telefoneCliente: '+258 86 987 6543',
    itens: [
      { produto: 'p7', nome: 'Refrigerante Sorriso Laranja', sabor: 'Laranja', quantidadeFardos: 40, precoFardoMZN: 540, subtotalMZN: 21600 },
      { produto: 'p11', nome: 'Água Mineral Serena', sabor: 'Natural', quantidadeFardos: 50, precoFardoMZN: 360, subtotalMZN: 18000 }
    ],
    totalFardos: 90,
    valorTotalMZN: 39600,
    metodoPagamento: 'M-Pesa',
    estadoPagamento: 'Pago',
    createdAt: new Date().toISOString()
  }
];

// Estado Global da Aplicação com valores padrão resilientes
const savedLocalProducts = localStorage.getItem('stb_local_products');
const initialProducts = savedLocalProducts ? JSON.parse(savedLocalProducts) : defaultProducts;

const state = {
  currentView: 'overview',
  stats: null,
  products: initialProducts,
  orders: defaultOrders,
  sales: defaultSales,
  stock: null,
  customers: defaultCustomers
};

// Gerar estatísticas a partir do estado atual
function recalculateLocalStats() {
  const prods = state.products;
  const vends = state.sales;
  const peds = state.orders;

  const totalFaturadoMZN = vends.reduce((a, b) => a + (b.valorTotalMZN || 0), 0);
  const totalFardosVendidos = vends.reduce((a, b) => a + (b.totalFardos || 0), 0);
  const stockTotalFardos = prods.reduce((a, b) => a + (b.stockFardos || 0), 0);
  const criticos = prods.filter(p => p.stockFardos <= p.stockMinimoFardos);

  state.stats = {
    success: true,
    kpis: {
      totalFaturadoMZN,
      faturadoHojeMZN: totalFaturadoMZN,
      totalFardosVendidos,
      pedidosPendentes: peds.filter(p => p.estado === 'Pendente').length,
      totalPedidos: peds.length,
      stockTotalFardos,
      produtosCriticosCount: criticos.length,
      totalClientes: state.customers.length
    },
    stockPorMarca: {
      'Sorriso': prods.filter(p => p.marca === 'Sorriso').reduce((a, b) => a + b.stockFardos, 0),
      'First Cola': prods.filter(p => p.marca === 'First Cola').reduce((a, b) => a + b.stockFardos, 0),
      'Água Serena': prods.filter(p => p.marca === 'Água Serena').reduce((a, b) => a + b.stockFardos, 0)
    },
    produtosCriticos: criticos,
    ultimasVendas: vends.slice(0, 5),
    ultimosPedidos: peds.slice(0, 5)
  };
}

recalculateLocalStats();

// ==========================================================================
// Autenticação & Controlo de Acesso
// ==========================================================================
function checkAuth() {
  const token = localStorage.getItem('stb_auth_token') || sessionStorage.getItem('stb_auth_token');
  if (!token) {
    window.location.href = '/admin/login.html';
    return false;
  }
  return true;
}

function handleLogout() {
  if (confirm('Tem a certeza que deseja terminar a sessão?')) {
    localStorage.removeItem('stb_auth_token');
    localStorage.removeItem('stb_auth_user');
    sessionStorage.removeItem('stb_auth_token');
    sessionStorage.removeItem('stb_auth_user');
    window.location.href = '/admin/login.html';
  }
}

function initUserProfile() {
  const userJson = localStorage.getItem('stb_auth_user') || sessionStorage.getItem('stb_auth_user');
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      const nameEl = document.getElementById('adminUserName');
      if (nameEl) nameEl.textContent = user.nome || 'Administrador';
    } catch (e) {}
  }
}

// ==========================================================================
// Inicialização
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (!checkAuth()) return;
  initUserProfile();
  initClock();
  initNavigation();
  initModals();
  loadAllData();
});

// Relógio ao Vivo
function initClock() {
  const clockEl = document.getElementById('liveClock');
  const update = () => {
    const now = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' };
    if (clockEl) {
      clockEl.textContent = now.toLocaleDateString('pt-PT', options);
    }
  };
  update();
  setInterval(update, 30000);
}

// Navegação entre Vistas (Tabs)
function initNavigation() {
  const navButtons = document.querySelectorAll('.sidebar-nav .nav-item');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.querySelector('.admin-sidebar');

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const view = btn.dataset.view;
      if (!view) return;

      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      switchView(view);

      // Fecha sidebar móvel se aberta
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  });

  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

function switchView(viewName) {
  state.currentView = viewName;

  // Atualizar título da página
  const titles = {
    overview: 'Visão Geral & Desempenho Comercial',
    orders: 'Gestão de Pedidos dos Clientes',
    sales: 'Gestão de Vendas por Grosso',
    stock: 'Controlo de Stock & Armazém',
    products: 'Catálogo de Produtos & Sabores',
    customers: 'Diretório de Clientes & Revendedores'
  };
  const pageTitleEl = document.getElementById('pageTitle');
  if (pageTitleEl) pageTitleEl.textContent = titles[viewName] || 'Painel Comercial';

  // Mostrar secção ativa
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.style.display = 'none';
  });
  const activeSec = document.getElementById(`view-${viewName}`);
  if (activeSec) {
    activeSec.style.display = 'block';
  }

  // Recarregar dados específicos da vista
  if (viewName === 'overview') renderOverview();
  if (viewName === 'orders') renderOrders();
  if (viewName === 'sales') renderSales();
  if (viewName === 'stock') renderStock();
  if (viewName === 'products') renderProducts();
  if (viewName === 'customers') renderCustomers();
}

// ==========================================================================
// Carregamento de Dados da API
// ==========================================================================
async function loadAllData() {
  try {
    showLoading();
    await Promise.all([
      fetchStats(),
      fetchProducts(),
      fetchOrders(),
      fetchSales(),
      fetchStock(),
      fetchCustomers()
    ]);
    hideLoading();
    switchView(state.currentView);
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
    hideLoading();
  }
}

async function fetchStats() {
  try {
    const res = await fetch('/api/dashboard/stats');
    const json = await res.json();
    if (json.success) state.stats = json;
  } catch (e) {
    console.error('Erro fetchStats', e);
  }
}

async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    const json = await res.json();
    if (json.success) state.products = json.data;
  } catch (e) {
    console.error('Erro fetchProducts', e);
  }
}

async function fetchOrders() {
  try {
    const res = await fetch('/api/orders');
    const json = await res.json();
    if (json.success) state.orders = json.data;
  } catch (e) {
    console.error('Erro fetchOrders', e);
  }
}

async function fetchSales() {
  try {
    const res = await fetch('/api/sales');
    const json = await res.json();
    if (json.success) state.sales = json.data;
  } catch (e) {
    console.error('Erro fetchSales', e);
  }
}

async function fetchStock() {
  try {
    const res = await fetch('/api/stock');
    const json = await res.json();
    if (json.success) state.stock = json;
  } catch (e) {
    console.error('Erro fetchStock', e);
  }
}

async function fetchCustomers() {
  try {
    const res = await fetch('/api/customers');
    const json = await res.json();
    if (json.success) state.customers = json.data;
  } catch (e) {
    console.error('Erro fetchCustomers', e);
  }
}

// ==========================================================================
// Renderizador: 1. Visão Geral (Overview)
// ==========================================================================
function renderOverview() {
  const kpis = state.stats?.kpis || {};

  // Formatação de Moeda
  const fmtMZN = (val) => Number(val || 0).toLocaleString('pt-PT', { style: 'currency', currency: 'MZN', maximumFractionDigits: 0 });

  document.getElementById('kpi-vendas-mes').textContent = fmtMZN(kpis.totalFaturadoMZN);
  document.getElementById('kpi-vendas-hoje').textContent = fmtMZN(kpis.faturadoHojeMZN);
  document.getElementById('kpi-stock-total').textContent = `${Number(kpis.stockTotalFardos || 0).toLocaleString()} Fardos`;
  document.getElementById('kpi-pedidos-pendentes').textContent = kpis.pedidosPendentes || 0;

  // Alerta de stock baixo no topo
  const alertContainer = document.getElementById('overview-stock-alert');
  const criticos = state.stats?.produtosCriticos || [];
  if (criticos.length > 0) {
    alertContainer.style.display = 'flex';
    document.getElementById('alert-stock-count').textContent = criticos.length;
    document.getElementById('alert-stock-list').textContent = criticos.map(p => `${p.nome} (${p.stockFardos} fardos)`).join(', ');
  } else {
    alertContainer.style.display = 'none';
  }

  // Atualizar badge do menu
  const stockBadge = document.getElementById('badge-stock-alert');
  if (stockBadge) {
    if (criticos.length > 0) {
      stockBadge.style.display = 'inline-block';
      stockBadge.textContent = criticos.length;
    } else {
      stockBadge.style.display = 'none';
    }
  }

  // Stock por marca
  const marcaData = state.stats?.stockPorMarca || {};
  document.getElementById('stock-sorriso').textContent = `${Number(marcaData['Sorriso'] || 0).toLocaleString()} fardos`;
  document.getElementById('stock-first-cola').textContent = `${Number(marcaData['First Cola'] || 0).toLocaleString()} fardos`;
  document.getElementById('stock-agua-serena').textContent = `${Number(marcaData['Água Serena'] || 0).toLocaleString()} fardos`;

  // Tabela Vendas Recentes
  const ultimasVendas = state.stats?.ultimasVendas || [];
  const tbodyVendas = document.getElementById('tbody-ultimas-vendas');
  if (tbodyVendas) {
    if (ultimasVendas.length === 0) {
      tbodyVendas.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:20px;">Nenhuma venda registada ainda.</td></tr>';
    } else {
      tbodyVendas.innerHTML = ultimasVendas.map(v => `
        <tr>
          <td><strong>${v.numeroVenda}</strong></td>
          <td>${v.nomeCliente}</td>
          <td>${v.totalFardos} fardos</td>
          <td><strong>${fmtMZN(v.valorTotalMZN)}</strong></td>
          <td><span class="status-pill status-delivered">${v.metodoPagamento}</span></td>
        </tr>
      `).join('');
    }
  }

  // Tabela Pedidos Recentes
  const ultimosPedidos = state.stats?.ultimosPedidos || [];
  const tbodyPedidos = document.getElementById('tbody-ultimos-pedidos');
  if (tbodyPedidos) {
    if (ultimosPedidos.length === 0) {
      tbodyPedidos.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:20px;">Nenhum pedido registado ainda.</td></tr>';
    } else {
      tbodyPedidos.innerHTML = ultimosPedidos.map(p => `
        <tr>
          <td><strong>${p.numeroPedido}</strong></td>
          <td>${p.nomeCliente} (${p.cidade})</td>
          <td>${p.totalFardos} fardos</td>
          <td>${fmtMZN(p.valorTotalMZN)}</td>
          <td>${getStatusBadge(p.estado)}</td>
        </tr>
      `).join('');
    }
  }
}

// ==========================================================================
// Renderizador: 2. Gestão de Pedidos
// ==========================================================================
function renderOrders() {
  const tbody = document.getElementById('tbody-pedidos');
  const fmtMZN = (val) => Number(val || 0).toLocaleString('pt-PT', { style: 'currency', currency: 'MZN', maximumFractionDigits: 0 });

  const filtroEstado = document.getElementById('filtro-pedidos-estado')?.value || '';
  const busca = document.getElementById('busca-pedidos')?.value.toLowerCase() || '';

  const lista = state.orders.filter(o => {
    const matchEstado = !filtroEstado || o.estado === filtroEstado;
    const matchBusca = !busca || o.numeroPedido.toLowerCase().includes(busca) || o.nomeCliente.toLowerCase().includes(busca) || o.telefoneCliente.includes(busca);
    return matchEstado && matchBusca;
  });

  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:#94a3b8;">Nenhum pedido encontrado com estes critérios.</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(o => `
    <tr>
      <td><strong>${o.numeroPedido}</strong></td>
      <td>
        <div style="font-weight:700;">${o.nomeCliente}</div>
        <div style="font-size:0.78rem; color:#64748b;">${o.telefoneCliente} &bull; ${o.cidade}</div>
      </td>
      <td>
        ${o.itens.map(i => `<div style="font-size:0.8rem;">${i.quantidadeFardos}x ${i.nome}</div>`).join('')}
      </td>
      <td><strong>${o.totalFardos}</strong> fardos</td>
      <td><strong>${fmtMZN(o.valorTotalMZN)}</strong></td>
      <td>
        <select class="form-control" style="padding:4px 8px; font-size:0.8rem; font-weight:700;" onchange="updateOrderStatus('${o._id}', this.value)">
          <option value="Pendente" ${o.estado === 'Pendente' ? 'selected' : ''}>Pendente</option>
          <option value="Confirmado" ${o.estado === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
          <option value="Em Preparação" ${o.estado === 'Em Preparação' ? 'selected' : ''}>Em Preparação</option>
          <option value="Pronto para Entrega" ${o.estado === 'Pronto para Entrega' ? 'selected' : ''}>Pronto p/ Entrega</option>
          <option value="Entregue" ${o.estado === 'Entregue' ? 'selected' : ''}>Entregue</option>
          <option value="Cancelado" ${o.estado === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
        </select>
      </td>
      <td>
        <a href="https://wa.me/${o.telefoneCliente.replace(/[^0-9]/g, '')}?text=Ol%C3%A1%20${encodeURIComponent(o.nomeCliente)},%20informamos%20que%20o%20seu%20pedido%20${o.numeroPedido}%20est%C3%A1%20${encodeURIComponent(o.estado)}." target="_blank" class="btn-outline" style="padding:4px 8px; font-size:0.76rem;" title="Notificar cliente via WhatsApp">
          WhatsApp
        </a>
      </td>
    </tr>
  `).join('');
}

async function updateOrderStatus(orderId, novoEstado) {
  try {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: novoEstado })
    });
    const json = await res.json();
    if (json.success) {
      await fetchOrders();
      await fetchStats();
      renderOrders();
      renderOverview();
    } else {
      alert('Erro ao atualizar estado: ' + json.message);
    }
  } catch (err) {
    alert('Erro de comunicação com o servidor');
  }
}

// ==========================================================================
// Renderizador: 3. Gestão de Vendas (Grossistas)
// ==========================================================================
function renderSales() {
  const tbody = document.getElementById('tbody-vendas');
  const fmtMZN = (val) => Number(val || 0).toLocaleString('pt-PT', { style: 'currency', currency: 'MZN', maximumFractionDigits: 0 });

  const filtroPagamento = document.getElementById('filtro-vendas-pagamento')?.value || '';
  const busca = document.getElementById('busca-vendas')?.value.toLowerCase() || '';

  const lista = state.sales.filter(s => {
    const matchPagamento = !filtroPagamento || s.metodoPagamento === filtroPagamento;
    const matchBusca = !busca || s.numeroVenda.toLowerCase().includes(busca) || s.nomeCliente.toLowerCase().includes(busca);
    return matchPagamento && matchBusca;
  });

  const totalFaturado = lista.reduce((a, b) => a + (b.valorTotalMZN || 0), 0);
  const totalFardos = lista.reduce((a, b) => a + (b.totalFardos || 0), 0);

  document.getElementById('sales-total-mzn').textContent = fmtMZN(totalFaturado);
  document.getElementById('sales-total-fardos').textContent = `${Number(totalFardos).toLocaleString()} fardos`;

  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:#94a3b8;">Nenhuma venda registada com estes filtros.</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(s => `
    <tr>
      <td><strong>${s.numeroVenda}</strong></td>
      <td>
        <div style="font-weight:700;">${s.nomeCliente}</div>
        <div style="font-size:0.75rem; color:#64748b;">${new Date(s.createdAt).toLocaleDateString('pt-PT')}</div>
      </td>
      <td>
        ${s.itens.map(i => `<span style="font-size:0.78rem; display:block;">${i.quantidadeFardos}x ${i.nome}</span>`).join('')}
      </td>
      <td><strong>${s.totalFardos}</strong> fardos</td>
      <td><strong style="color:var(--brand-blue);">${fmtMZN(s.valorTotalMZN)}</strong></td>
      <td><span class="status-pill status-confirmed">${s.metodoPagamento}</span></td>
      <td><span class="status-pill status-delivered">${s.estadoPagamento}</span></td>
    </tr>
  `).join('');
}

// ==========================================================================
// Renderizador: 4. Controlo de Stock
// ==========================================================================
function renderStock() {
  const container = document.getElementById('stock-grid-container');
  const products = state.products;

  if (products.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:40px; color:#94a3b8;">A carregar dados de stock...</div>';
    return;
  }

  container.innerHTML = products.map(p => {
    const isCritico = p.stockFardos <= p.stockMinimoFardos;
    const isEsgotado = p.stockFardos === 0;

    const percent = Math.min(100, Math.round((p.stockFardos / (p.stockMinimoFardos * 3 || 100)) * 100));

    let fillClass = '';
    let badgeClass = 'status-normal';
    let statusText = 'Normal';

    if (isEsgotado) {
      fillClass = 'fill-danger';
      badgeClass = 'status-low';
      statusText = 'Esgotado';
    } else if (isCritico) {
      fillClass = 'fill-warning';
      badgeClass = 'status-low';
      statusText = 'Stock Baixo';
    }

    return `
      <div class="stock-item-card" style="${isCritico ? 'border-color:#fca5a5;' : ''}">
        <div class="stock-item-header">
          <div>
            <span class="stock-item-brand">${p.marca}</span>
            <div class="stock-item-name">${p.sabor ? p.sabor : p.nome}</div>
            <div style="font-size:0.76rem; color:#64748b;">${p.capacidade} &bull; ${p.unidadesPorFardo} garrafas/fardo</div>
          </div>
          <span class="status-pill ${badgeClass}">${statusText}</span>
        </div>

        <div class="stock-item-fardos">
          <span class="stock-fardos-num">${p.stockFardos}</span>
          <span style="font-size:0.85rem; color:#64748b; font-weight:600;">fardos disponíveis</span>
        </div>

        <div class="stock-progress-bar">
          <div class="stock-progress-fill ${fillClass}" style="width: ${percent}%;"></div>
        </div>

        <div style="display:flex; justify-content:space-between; font-size:0.74rem; color:#64748b;">
          <span>Mínimo: ${p.stockMinimoFardos} fardos</span>
          <span>Preço: ${p.precoFardoMZN} MZN/fardo</span>
        </div>

        <div class="stock-item-actions">
          <button class="stock-btn-quick" onclick="openStockMoveModal('${p._id}', 'Entrada (Produção)')">+ Entrada</button>
          <button class="stock-btn-quick" onclick="openStockMoveModal('${p._id}', 'Saída (Venda)')">- Saída</button>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// Renderizador: 5. Gestão de Produtos
// ==========================================================================
function renderProducts() {
  const tbody = document.getElementById('tbody-produtos');
  const fmtMZN = (val) => Number(val || 0).toLocaleString('pt-PT', { style: 'currency', currency: 'MZN', maximumFractionDigits: 0 });

  tbody.innerHTML = state.products.map(p => `
    <tr>
      <td><strong>${p.codigo || '—'}</strong></td>
      <td><strong>${p.nome}</strong></td>
      <td><span class="status-pill status-confirmed">${p.marca}</span></td>
      <td>${p.capacidade}</td>
      <td><strong>${fmtMZN(p.precoFardoMZN)}</strong></td>
      <td>${fmtMZN(p.precoUnitarioMZN)}</td>
      <td><strong>${p.stockFardos}</strong> fardos</td>
      <td>
        <button class="btn-outline" style="padding:4px 10px; font-size:0.78rem;" onclick="openEditPriceModal('${p._id}', '${p.nome}', ${p.precoFardoMZN}, ${p.precoUnitarioMZN})">
          Editar Preço
        </button>
      </td>
    </tr>
  `).join('');
}

// ==========================================================================
// Renderizador: 6. Gestão de Clientes
// ==========================================================================
function renderCustomers() {
  const tbody = document.getElementById('tbody-clientes');
  const fmtMZN = (val) => Number(val || 0).toLocaleString('pt-PT', { style: 'currency', currency: 'MZN', maximumFractionDigits: 0 });

  const busca = document.getElementById('busca-clientes')?.value.toLowerCase() || '';
  const lista = state.customers.filter(c => {
    return !busca || c.nome.toLowerCase().includes(busca) || c.telefone.includes(busca) || c.cidade.toLowerCase().includes(busca);
  });

  if (lista.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:30px; color:#94a3b8;">Nenhum cliente cadastrado.</td></tr>';
    return;
  }

  tbody.innerHTML = lista.map(c => `
    <tr>
      <td><strong>${c.nome}</strong></td>
      <td><span class="status-pill status-confirmed">${c.tipo}</span></td>
      <td>${c.telefone}</td>
      <td>${c.cidade}</td>
      <td><strong>${c.totalPedidos || 0}</strong></td>
      <td><strong>${fmtMZN(c.totalComprasMZN)}</strong></td>
      <td>
        <a href="https://wa.me/${c.telefone.replace(/[^0-9]/g, '')}" target="_blank" class="btn-outline" style="padding:4px 8px; font-size:0.76rem;">
          WhatsApp
        </a>
      </td>
    </tr>
  `).join('');
}

// ==========================================================================
// Modais e Submissões de Formulários
// ==========================================================================
function initModals() {
  // Fechar modais ao clicar no botão X ou overlay
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close-btn') || e.target.classList.contains('btn-cancel-modal')) {
        closeAllModals();
      }
    });
  });

  // Eventos dos formulários
  const formVenda = document.getElementById('form-nova-venda');
  if (formVenda) formVenda.addEventListener('submit', handleNewSaleSubmit);

  const formPedido = document.getElementById('form-novo-pedido');
  if (formPedido) formPedido.addEventListener('submit', handleNewOrderSubmit);

  const formStock = document.getElementById('form-mover-stock');
  if (formStock) formStock.addEventListener('submit', handleStockMoveSubmit);

  const formCliente = document.getElementById('form-novo-cliente');
  if (formCliente) formCliente.addEventListener('submit', handleNewCustomerSubmit);

  const formPreco = document.getElementById('form-editar-preco');
  if (formPreco) formPreco.addEventListener('submit', handleProductPriceSubmit);
}

function openModal(modalId) {
  closeAllModals();
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

// Modal: Nova Venda por Grosso
function openNewSaleModal() {
  populateProductSelect('venda-produto-select');
  populateCustomerSelect('venda-cliente-select');
  document.getElementById('venda-total-calculado').textContent = '0 MZN';
  openModal('modal-nova-venda');
}

// Modal: Novo Pedido
function openNewOrderModal() {
  populateProductSelect('pedido-produto-select');
  populateCustomerSelect('pedido-cliente-select');
  openModal('modal-novo-pedido');
}

// Modal: Mover Stock
function openStockMoveModal(produtoId = '', tipo = 'Entrada (Produção)') {
  populateProductSelect('stock-move-produto-select');
  if (produtoId) {
    document.getElementById('stock-move-produto-select').value = produtoId;
  }
  document.getElementById('stock-move-tipo-select').value = tipo;
  openModal('modal-mover-stock');
}

// Modal: Novo Cliente
function openNewCustomerModal() {
  openModal('modal-novo-cliente');
}

// Modal: Editar Preço
function openEditPriceModal(prodId, prodNome, precoFardo, precoUnitario) {
  document.getElementById('edit-preco-id').value = prodId;
  document.getElementById('edit-preco-nome').textContent = prodNome;
  document.getElementById('edit-preco-fardo').value = precoFardo;
  document.getElementById('edit-preco-unitario').value = precoUnitario;
  openModal('modal-editar-preco');
}

// Auxiliares de População de Selects
function populateProductSelect(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;
  el.innerHTML = '<option value="">-- Selecione o Produto / Sabor --</option>' +
    state.products.map(p => `<option value="${p._id}" data-preco="${p.precoFardoMZN}" data-stock="${p.stockFardos}">${p.nome} (${p.stockFardos} fardos disp. - ${p.precoFardoMZN} MZN)</option>`).join('');
}

function populateCustomerSelect(selectId) {
  const el = document.getElementById(selectId);
  if (!el) return;
  el.innerHTML = '<option value="">-- Cliente não cadastrado / Avulso --</option>' +
    state.customers.map(c => `<option value="${c._id}" data-nome="${c.nome}" data-tel="${c.telefone}">${c.nome} (${c.tipo} - ${c.cidade})</option>`).join('');
}

// Cálculo dinâmico do total da venda
function recalcularTotalVenda() {
  const selectProd = document.getElementById('venda-produto-select');
  const qtdInput = document.getElementById('venda-qtd-fardos');
  const selectedOpt = selectProd.options[selectProd.selectedIndex];

  if (!selectedOpt || !selectedOpt.dataset.preco) {
    document.getElementById('venda-total-calculado').textContent = '0 MZN';
    return;
  }

  const preco = Number(selectedOpt.dataset.preco);
  const qtd = Number(qtdInput.value || 0);
  const total = preco * qtd;

  document.getElementById('venda-total-calculado').textContent = `${total.toLocaleString('pt-PT')} MZN`;
}

// Submissão: Nova Venda por Grosso
async function handleNewSaleSubmit(e) {
  e.preventDefault();
  const prodId = document.getElementById('venda-produto-select').value;
  const qtd = Number(document.getElementById('venda-qtd-fardos').value);
  const clienteSelect = document.getElementById('venda-cliente-select');
  const selectedCliente = clienteSelect.options[clienteSelect.selectedIndex];

  let nomeCliente = document.getElementById('venda-nome-cliente').value.trim();
  let telefoneCliente = document.getElementById('venda-telefone-cliente').value.trim();
  let clienteId = null;

  if (selectedCliente && selectedCliente.value) {
    clienteId = selectedCliente.value;
    nomeCliente = selectedCliente.dataset.nome;
    telefoneCliente = selectedCliente.dataset.tel;
  }

  if (!nomeCliente) {
    alert('Por favor, informe o nome do cliente.');
    return;
  }
  if (!prodId || qtd <= 0) {
    alert('Selecione um produto e quantidade válida.');
    return;
  }

  const metodoPagamento = document.getElementById('venda-metodo-pagamento').value;
  const ref = document.getElementById('venda-referencia').value.trim();

  try {
    const res = await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clienteId,
        nomeCliente,
        telefoneCliente,
        itens: [{ produtoId: prodId, quantidadeFardos: qtd }],
        metodoPagamento,
        referenciaComprovativo: ref
      })
    });

    const json = await res.json();
    if (json.success) {
      alert('Venda registada com sucesso! O stock foi atualizado.');
      closeAllModals();
      await loadAllData();
      switchView('sales');
    } else {
      alert('Erro: ' + json.message);
    }
  } catch (err) {
    alert('Erro de comunicação com o servidor.');
  }
}

// Submissão: Novo Pedido
async function handleNewOrderSubmit(e) {
  e.preventDefault();
  const prodId = document.getElementById('pedido-produto-select').value;
  const qtd = Number(document.getElementById('pedido-qtd-fardos').value);
  const nomeCliente = document.getElementById('pedido-nome-cliente').value.trim();
  const telefoneCliente = document.getElementById('pedido-telefone-cliente').value.trim();
  const cidade = document.getElementById('pedido-cidade').value.trim() || 'Maputo';
  const obs = document.getElementById('pedido-observacoes').value.trim();

  if (!nomeCliente || !telefoneCliente || !prodId || qtd <= 0) {
    alert('Preencha os campos obrigatórios.');
    return;
  }

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nomeCliente,
        telefoneCliente,
        cidade,
        observacoes: obs,
        itens: [{ produtoId: prodId, quantidadeFardos: qtd }]
      })
    });

    const json = await res.json();
    if (json.success) {
      alert('Pedido registado com sucesso!');
      closeAllModals();
      await loadAllData();
      switchView('orders');
    } else {
      alert('Erro: ' + json.message);
    }
  } catch (err) {
    alert('Erro de comunicação com o servidor.');
  }
}

// Submissão: Movimentação de Stock
async function handleStockMoveSubmit(e) {
  e.preventDefault();
  const produtoId = document.getElementById('stock-move-produto-select').value;
  const tipo = document.getElementById('stock-move-tipo-select').value;
  const quantidadeFardos = Number(document.getElementById('stock-move-qtd').value);
  const motivo = document.getElementById('stock-move-motivo').value.trim();

  if (!produtoId || quantidadeFardos <= 0) {
    alert('Selecione um produto e quantidade válida.');
    return;
  }

  try {
    const res = await fetch('/api/stock/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produtoId, tipo, quantidadeFardos, motivo })
    });

    const json = await res.json();
    if (json.success) {
      alert('Stock atualizado com sucesso!');
      closeAllModals();
      await loadAllData();
      switchView('stock');
    } else {
      alert('Erro: ' + json.message);
    }
  } catch (err) {
    alert('Erro de comunicação com o servidor.');
  }
}

// Submissão: Novo Cliente
async function handleNewCustomerSubmit(e) {
  e.preventDefault();
  const nome = document.getElementById('cliente-nome').value.trim();
  const tipo = document.getElementById('cliente-tipo').value;
  const telefone = document.getElementById('cliente-telefone').value.trim();
  const cidade = document.getElementById('cliente-cidade').value.trim();
  const nuit = document.getElementById('cliente-nuit').value.trim();

  if (!nome || !telefone) {
    alert('Nome e telefone são obrigatórios.');
    return;
  }

  try {
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, tipo, telefone, cidade, nuit })
    });

    const json = await res.json();
    if (json.success) {
      alert('Cliente cadastrado com sucesso!');
      closeAllModals();
      await loadAllData();
      switchView('customers');
    } else {
      alert('Erro: ' + json.message);
    }
  } catch (err) {
    alert('Erro de comunicação com o servidor.');
  }
}

// Submissão: Editar Preço do Produto
async function handleProductPriceSubmit(e) {
  e.preventDefault();
  const prodId = document.getElementById('edit-preco-id').value;
  const precoFardoMZN = Number(document.getElementById('edit-preco-fardo').value);
  const precoUnitarioMZN = Number(document.getElementById('edit-preco-unitario').value);

  if (precoFardoMZN < 0) {
    alert('O preço não pode ser negativo.');
    return;
  }

  try {
    const res = await fetch(`/api/products/${prodId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ precoFardoMZN, precoUnitarioMZN })
    });

    const json = await res.json();
    if (json.success) {
      alert('Preços atualizados com sucesso!');
      closeAllModals();
      await loadAllData();
      switchView('products');
    } else {
      alert('Erro: ' + json.message);
    }
  } catch (err) {
    alert('Erro ao atualizar preços.');
  }
}

// Utilitários de Interface
function getStatusBadge(estado) {
  const map = {
    'Pendente': 'status-pending',
    'Confirmado': 'status-confirmed',
    'Em Preparação': 'status-confirmed',
    'Pronto para Entrega': 'status-confirmed',
    'Entregue': 'status-delivered',
    'Cancelado': 'status-cancelled'
  };
  return `<span class="status-pill ${map[estado] || 'status-pending'}">${estado}</span>`;
}

function showLoading() {
  // Opcional indicador discreto
}

function hideLoading() {
  // Opcional
}
