const express = require("express");
const router  = express.Router();

const { criarPost, listarPosts, buscarPost, atualizarPost, deletarPost } = require("../controllers/postController");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Rotas públicas (sem token)
router.get("/posts",     listarPosts);
router.get("/posts/:id", buscarPost);

// Rotas protegidas (exigem token válido do Auth Service)
router.post  ("/posts",     authMiddleware, criarPost);
router.put   ("/posts/:id", authMiddleware, atualizarPost);
router.delete("/posts/:id", authMiddleware, deletarPost);

module.exports = router;
