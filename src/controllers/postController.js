const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require("../models/postModel");

// POST /posts — cria um novo post
function criarPost(req, res) {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Título e conteúdo são obrigatórios" });
    }

    const post = {
        user_id:    req.user.id,
        user_email: req.user.email,
        username:   req.user.username || null,
        title,
        content
    };

    createPost(post, (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao criar post" });

        return res.status(201).json({
            message: "Post criado com sucesso",
            id: result.insertId
        });
    });
}

// GET /posts — lista todos os posts (público)
function listarPosts(req, res) {
    getAllPosts((err, rows) => {
        if (err) return res.status(500).json({ message: "Erro ao listar posts" });
        res.json(rows);
    });
}

// GET /posts/:id — retorna um post específico (público)
function buscarPost(req, res) {
    const { id } = req.params;

    getPostById(id, (err, rows) => {
        if (err)  return res.status(500).json({ message: "Erro ao buscar post" });
        if (!rows.length) return res.status(404).json({ message: "Post não encontrado" });

        res.json(rows[0]);
    });
}

// PUT /posts/:id — atualiza post (somente o dono)
function atualizarPost(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Título e conteúdo são obrigatórios" });
    }

    updatePost(id, req.user.id, { title, content }, (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao atualizar post" });

        if (result.affectedRows === 0) {
            return res.status(403).json({ message: "Post não encontrado ou sem permissão" });
        }

        res.json({ message: "Post atualizado", id });
    });
}

// DELETE /posts/:id — deleta post (somente o dono)
function deletarPost(req, res) {
    const { id } = req.params;

    deletePost(id, req.user.id, (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao deletar post" });

        if (result.affectedRows === 0) {
            return res.status(403).json({ message: "Post não encontrado ou sem permissão" });
        }

        res.json({ message: "Post deletado", id });
    });
}

module.exports = { criarPost, listarPosts, buscarPost, atualizarPost, deletarPost };
