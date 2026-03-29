CREATE DATABASE IF NOT EXISTS posts_db;
USE posts_db;

CREATE TABLE posts (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    user_id     INT           NOT NULL,          -- ID vindo do Auth Service
    user_email  VARCHAR(255)  NOT NULL,          -- guardado no token JWT
    title       VARCHAR(255)  NOT NULL,
    content     TEXT          NOT NULL,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
