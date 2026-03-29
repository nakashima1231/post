const db = require("../database/db");

function createPost(post, callback) {
    db.query(
        "INSERT INTO posts (user_id, user_email, username, name, title, content) VALUES (?, ?, ?, ?, ?, ?)",
        [post.user_id, post.user_email, post.username, post.name, post.title, post.content],
        callback
    );
}

function getAllPosts(callback) {
    db.query(
        "SELECT id, user_id, user_email, username, name, title, content, created_at FROM posts ORDER BY created_at DESC",
        callback
    );
}

function getPostById(id, callback) {
    db.query("SELECT * FROM posts WHERE id = ?", [id], callback);
}

function updatePost(id, userId, post, callback) {
    db.query(
        "UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?",
        [post.title, post.content, id, userId],
        callback
    );
}

function deletePost(id, userId, callback) {
    db.query(
        "DELETE FROM posts WHERE id = ? AND user_id = ?",
        [id, userId],
        callback
    );
}

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
