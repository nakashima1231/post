CREATE DATABASE IF NOT EXISTS posts_db;
USE posts_db;

CREATE TABLE posts (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    user_id     INT           NOT NULL,
    user_email  VARCHAR(255)  NOT NULL,
    username    VARCHAR(255),  
    name        VARCHAR(255), 
    title       VARCHAR(255)  NOT NULL,
    content     TEXT          NOT NULL,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


   
