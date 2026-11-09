# Sol Tropical Bebidas, Lda.

Website oficial, catálogo institucional, API REST e **Painel Administrativo Comercial (Dashboard)** da **Sol Tropical Bebidas, Lda.** — Moçambique.

Produtores e distribuidores de bebidas refrescantes de alta qualidade:
- **Refrigerantes Sorriso** (9 Sabores: Tamarindo, Maçã Verde, Ananás, Limão, Maracujá, Uva, Laranja, Maçã & Canela e Morango)
- **First Cola** (Formato 350ml)
- **Água Serena** (Água mineral super hidratante 500ml)

---

## Painel Comercial & Dashboard (`/admin`)

O painel administrativo centraliza a gestão comercial e operacional da empresa:
- **Gestão de Pedidos:** Acompanhar pedidos dos clientes, atualizar estados (*Pendente*, *Confirmado*, *Em Preparação*, *Entregue*) e contactar clientes via WhatsApp.
- **Controlo de Stock:** Quantidades disponíveis de fardos por produto e sabor, alertas visuais de stock baixo/esgotado e registo de movimentações (Entrada de Produção, Saída, Ajustes).
- **Gestão de Vendas:** Registo de vendas por grosso com abatimento automático de stock, cálculo em Meticais (MZN) e formas de pagamento locais (*M-Pesa*, *E-Mola*, *Transferência Bancária*, *Dinheiro*, *POS*).
- **Gestão de Produtos:** Catálogo oficial com os 3 produtos e respetivos 9 sabores de Sorriso, gestão de preços de fardo e unitários.
- **Gestão de Clientes:** Diretório de revendedores, grossistas e supermercados com histórico de faturamento acumulado.

---

## Estrutura do Projeto

```text
soltropicalbebidas/
├── .env                         # Variáveis de ambiente (ignorado pelo Git)
├── .env.example                 # Modelo das variáveis de ambiente
├── .gitignore                   # Ficheiros ignorados pelo Git
├── README.md                    # Documentação do projeto
├── package.json                 # Dependências e scripts Node.js
├── db.js                        # Conexão com MongoDB Atlas (Mongoose)
├── server.js                    # Servidor Express & API REST
├── seed.js                      # Carga dos produtos, sabores e clientes padrão
├── test-db.js                   # Script para testar a conexão com o MongoDB
├── index.html                   # Website público e catálogo
├── admin/                       # Painel Administrativo Comercial
│   ├── index.html               # Interface do Dashboard
│   ├── css/admin.css            # Folha de estilo moderna e responsiva
│   └── js/admin.js              # Lógica reativa, integração com a API e modais
├── models/                      # Modelos Mongoose
│   ├── Product.js               # Produtos, preços e stock de fardos
│   ├── Customer.js              # Cadastro de clientes e histórico de compras
│   ├── Order.js                 # Pedidos e estados de entrega
│   ├── Sale.js                  # Vendas por grosso e faturamento
│   ├── StockMovement.js         # Auditoria de entradas e saídas de stock
│   └── Inquiry.js               # Mensagens e leads do site público
├── routes/                      # Controladores da API REST
│   ├── products.js              # /api/products
│   ├── stock.js                 # /api/stock
│   ├── orders.js                # /api/orders
│   ├── sales.js                 # /api/sales
│   ├── customers.js             # /api/customers
│   └── stats.js                 # /api/dashboard/stats
└── assets/                      # Recursos do Website público
    ├── css/style.css
    ├── js/main.js
    └── images/
```

---

## Como Iniciar

1. Instalar as dependências:
   ```bash
   npm install
   ```

2. Configurar o arquivo `.env`:
   ```bash
   cp .env.example .env
   ```

3. Carregar os produtos e sabores iniciais (opcional, o servidor também faz auto-seed se a base estiver vazia):
   ```bash
   npm run seed
   ```

4. Iniciar o servidor em desenvolvimento:
   ```bash
   npm run dev
   ```

5. Aceder às plataformas:
   - **Website Público:** `http://localhost:3000/`
   - **Painel Administrativo:** `http://localhost:3000/admin`
