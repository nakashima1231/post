require("dotenv").config();

const express    = require("express");
const conexao    = require("./database/db");
const postRoutes = require("./routes/postRoutes");

const app = express();

// CORS — necessário porque o front (auth-service) chama este serviço de outro domínio
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
});

app.use(express.json());

// Rotas do CRUD de posts
app.use(postRoutes);

app.get("/", (req, res) => {
    res.json({ service: "Posts Service", status: "online" });
});

// Conecta ao banco de dados
conexao.connect((err) => {
    if (err) throw new Error(err);
    console.log("Posts Service — banco de dados conectado");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Posts Service rodando em http://localhost:${PORT}`);
    console.log(`Auth Service esperado em ${process.env.AUTH_SERVICE_URL}`);
});
