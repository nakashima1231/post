require("dotenv").config();

const express  = require("express");
const conexao  = require("./database/db");
const postRoutes = require("./routes/postRoutes");

const app = express();
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
