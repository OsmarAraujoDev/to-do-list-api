
# 📝 To-Do List API

API REST para gerenciamento de tarefas (To-Do List), desenvolvida com **Node.js**, **Express** e **PostgreSQL**.  
O projeto segue boas práticas de backend, incluindo autenticação, validação de dados, tratamento de erros e organização em camadas.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **PostgreSQL**
- **npm**

---

## 📦 Principais Dependências

```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.2.3",
  "express": "^4.22.1",
  "express-async-errors": "^3.1.1",
  "express-session": "^1.19.0",
  "joi": "^18.0.2",
  "multer": "^2.0.2",
  "pg": "^8.17.2",
  "winston": "^3.19.0"
}
````

---

## 📁 Estrutura do Projeto

```bash
to-do-list-app/
├── config/
│   ├── database.js
│   └── env.js
├── models/
│   ├── user.model.js
│   └── task.model.js
├── services/
│   ├── user.service.js
│   └── task.service.js
├── controllers/
│   ├── user.controller.js
│   └── task.controller.js
├── routes/
│   ├── user.routes.js
│   └── task.routes.js
├── validations/
│   ├── user.validation.js
│   └── task.validation.js
├── middlewares/
│   ├── auth.js
│   ├── errorHandler.js
│   └── upload.js
├── utils/
│   └── logger.js
├── app.js
├── server.js
├── .env.development
├── .env.production
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Configuração do Ambiente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/OsmarAraujoDev/to-do-list-app.git
cd to-do-list-app
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario_do_postgresql
DB_PASSWORD=sua_senha_do_postgresql
DB_NAME=nome_do_banco_de_dados
SESSION_SECRET=seu_segredo_da_sessao
```

---

## 🗄️ Banco de Dados

* Banco: **PostgreSQL**
* Conexão realizada via pacote **pg**
* Configurações centralizadas na pasta `config/`
* Certifique-se de que o banco esteja rodando antes de iniciar a aplicação

---

## ▶️ Executando o Projeto

```bash
npm start
```

Ou, se estiver usando modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em:

```
http://localhost:3000
```

---

## 📌 Funcionalidades

* ✅ Cadastro e autenticação de usuários
* 🔐 Criptografia de senhas com **bcrypt**
* 📝 CRUD de tarefas
* ✔️ Validação de dados com **Joi**
* 📂 Upload de arquivos com **Multer**
* 📋 Logs com **Winston**
* 🌐 CORS configurado
* ⚠️ Tratamento centralizado de erros com **middlewares**
* 🧩 Separação de responsabilidades (controllers, services, models)

---

## 📄 Licença

Este projeto está sob a licença **GNU GENERAL PUBLIC LICENSE**.

---

## 👨‍💻 Autor

**Osmar Araújo**

- GitHub: [@OsmarAraujoDev](https://github.com/OsmarAraujoDev)
- LinkedIn: [Osmar Araujo](www.linkedin.com/in/osmar-araujo-a88bb1396)
- Email: osmar.araujo.dev@gmail.com
