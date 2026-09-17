DROP DATABASE IF EXISTS torneo_videojuegos;
CREATE DATABASE torneo_videojuegos CHARACTER SET utf8mb4;
USE torneo_videojuegos;

CREATE TABLE jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    gamertag VARCHAR(50) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL,
    fecha_registro DATE NOT NULL DEFAULT (CURRENT_DATE)
);

CREATE TABLE videojuegos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    genero VARCHAR(50) NOT NULL
);

CREATE TABLE puntuaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jugador_id INT NOT NULL,
    videojuego_id INT NOT NULL,
    puntuacion INT NOT NULL,
    fecha DATE NOT NULL DEFAULT (CURRENT_DATE),
    CONSTRAINT fk_puntuacion_jugador FOREIGN KEY (jugador_id) REFERENCES jugadores(id),
    CONSTRAINT fk_puntuacion_videojuego FOREIGN KEY (videojuego_id) REFERENCES videojuegos(id),
    CONSTRAINT chk_puntuacion_no_negativa CHECK (puntuacion >= 0)
);

INSERT INTO jugadores (nombre, gamertag, correo) VALUES
('Carlos Medina', 'Shadow', 'carlos.medina@correo.com'),
('Ana Torres', 'Nova', 'ana.torres@correo.com'),
('Luis Chan', 'Ghost', 'luis.chan@correo.com');

INSERT INTO videojuegos (nombre, genero) VALUES
('Tekken', 'Pelea'),
('Valorant', 'Disparos'),
('Rocket League', 'Deportes');

INSERT INTO puntuaciones (jugador_id, videojuego_id, puntuacion) VALUES
(1, 1, 950),
(2, 1, 820),
(3, 1, 760);
