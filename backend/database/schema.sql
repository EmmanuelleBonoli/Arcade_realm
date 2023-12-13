DROP DATABASE IF EXISTS Arcade;
CREATE DATABASE Arcade;
USE Arcade;

CREATE TABLE utilisateur (
id INT primary key auto_increment NOT NULL,
pseudo VARCHAR(80) NOT NULL,
email VARCHAR(80) NOT NULL,
password VARCHAR(250) NOT NULL,
image VARCHAR(250) NOT NULL,
admin BOOLEAN NOT NULL,
points INT NOT NULL
);

CREATE TABLE jeu (
  id INT primary key auto_increment NOT NULL,
  name varchar(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  regles TEXT NOT NULL,
  actif BOOLEAN NOT NULL,
  physique BOOLEAN NOT NULL,
  date DATE NOT NULL,
  nb_borne INT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE lot (
  id INT PRIMARY KEY auto_increment NOT NULL,
  name VARCHAR(80) NOT NULL,
  image VARCHAR(250) NOT NULL,
  description VARCHAR(300),
  utilisateur_id INT,
  disponible BOOLEAN NOT NULL,
  CONSTRAINT fk_lot_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id)
);

CREATE TABLE evenement ( 
  id int primary key auto_increment not null,
  image varchar(250) not null
);

CREATE TABLE score (
  utilisateur_id INT NOT NULL,
  jeu_id INT NOT NULL,
  points INT NOT NULL,
  CONSTRAINT fk_score_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id),
  CONSTRAINT fk_score_jeu FOREIGN KEY (jeu_id) REFERENCES jeu(id)
);