CREATE DATABASE dblinks;

USE dblinks;

-- TABLE USER
-- all pasword wil be encrypted using SHA2
CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

INSERT INTO users (id, username, password, fullname) 
  VALUES (1, 'john', 'password1', 'John Carter');

SELECT * FROM users;

-- LINKS TABLE
CREATE TABLE links (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
  
);
CREATE TABLE preguntas(
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR (50)  ,
  correo VARCHAR (50)  ,
  mensaje VARCHAR(100)
);

ALTER TABLE links
  ADD horai_nicio2 VARCHAR(50),
  ADD horai_nicio3 VARCHAR(50),
  ADD horai_nicio4 VARCHAR(50),
  ADD horai_nicio5 VARCHAR(50),

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;

