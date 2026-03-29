# Posts Service — Microservice

Segundo serviço da arquitetura de microservices.
Gerencia posts de blog e **depende do Auth Service para autenticar usuários**.

---

## Como rodar

### 1. Auth Service (porta 3000)
```bash
cd nodejs-auth-jwt
node src/server.js
```

### 2. Posts Service (porta 3001)
```bash
cd posts-service
cp .env.example .env   # edite com suas credenciais
npm install
node src/server.js
```

---

## Rotas

| Método | Rota         | Auth? | Descrição                         |
|--------|--------------|-------|-----------------------------------|
| GET    | /posts       | Não   | Lista todos os posts              |
| GET    | /posts/:id   | Não   | Retorna um post específico        |
| POST   | /posts       | Sim   | Cria um novo post                 |
| PUT    | /posts/:id   | Sim   | Atualiza post (somente o dono)    |
| DELETE | /posts/:id   | Sim   | Deleta post (somente o dono)      |

---

## Fluxo de uma requisição protegida

```
Cliente
  │
  ├─ 1. POST /login → Auth Service (porta 3000)
  │       └─ resposta: { token: "eyJ..." }
  │
  ├─ 2. POST /posts  → Posts Service (porta 3001)
  │       └─ header: Authorization: Bearer eyJ...
  │
  └─ Posts Service
        ├─ 3. GET /dashboard → Auth Service (porta 3000)  ← comunicação entre serviços
        │       └─ Auth Service valida o JWT e retorna dados do usuário
        │
        └─ 4. Cria o post no banco → retorna 201
```

---

## Por que isso é um microservice?

- **Dois processos independentes**: cada serviço roda em sua própria porta e pode ser escalado separadamente.
- **Bancos de dados separados**: Auth usa `projeto_login_api`, Posts usa `posts_db`.
- **Comunicação via HTTP**: o Posts Service não conhece o segredo JWT — ele pergunta ao Auth Service se o token é válido.
- **Falha isolada**: se o Posts Service cair, o login ainda funciona (e vice-versa).

---

## Autor
Gabriel Makiyama Nakashima
