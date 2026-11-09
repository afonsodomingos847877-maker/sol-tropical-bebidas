# Sol Tropical Bebidas, Lda. ☀️

Website oficial, catálogo institucional e API da **Sol Tropical Bebidas, Lda.** — Moçambique.

Produtores e distribuidores de bebidas refrescantes de alta qualidade:
- **Refrigerantes Sorriso** (9 Sabores: Tamarindo, Maçã Verde, Ananás, Limão, Maracujá, Uva, Laranja, Maçã & Canela e Morango)
- **First Cola** (Formato 350ml)
- **Água Serena** (Água mineral super hidratante 500ml)

---

## 📁 Estrutura do Projeto

```text
saltropicalbebidas/
├── .env                         # Variáveis de ambiente (ignorado pelo Git)
├── .env.example                 # Modelo das variáveis de ambiente
├── .gitignore                   # Ficheiros ignorados pelo Git
├── README.md                    # Documentação do projeto
├── package.json                 # Dependências e scripts Node.js
├── db.js                        # Conexão com MongoDB Atlas (Mongoose)
├── server.js                    # Servidor Express & API REST
├── test-db.js                   # Script para testar a conexão com o MongoDB
├── index.html                   # Estrutura HTML principal (Frontend)
├── models/
│   └── Inquiry.js               # Schema/Modelo MongoDB para pedidos e contactos
└── assets/
    ├── css/
    │   └── style.css            # Folha de estilos e responsividade
    ├── js/
    │   └── main.js              # Scripts e interações do frontend
    └── images/
        ├── sorriso-banner.png   # Banner oficial com o catálogo completo
        ├── first-cola.png       # Garrafa First Cola 350ml
        └── wehosthere.png       # Logótipo do WeHostHere
```

---

## 🍃 Base de Dados MongoDB Atlas

A aplicação conecta-se à base de dados MongoDB Atlas na base **`soltropicalbebidasdb`**.

### Configuração local:
1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
2. Defina a sua variável `MONGODB_URI`:
   ```env
   MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@cluster0.oe0akin.mongodb.net/soltropicalbebidasdb?retryWrites=true&w=majority
   ```
3. Teste a conexão:
   ```bash
   npm run test:db
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

---

## 🚀 Hospedagem & Desenvolvimento

Powered by [WeHostHere](https://wehosthere.com).
