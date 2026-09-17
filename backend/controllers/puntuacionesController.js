const db = require("../config/database");

// Registrar puntuación
const crearPuntuacion = (req, res) => {
    const { jugador_id, videojuego_id, puntuacion } = req.body;

    if (!jugador_id || !videojuego_id || puntuacion === undefined) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    if (puntuacion < 0) {
        return res.status(400).json({
            mensaje: "La puntuación no puede ser negativa"
        });
    }

    // Verificar jugador
    const sqlJugador = "SELECT id FROM jugadores WHERE id = ?";

    db.query(sqlJugador, [jugador_id], (error, jugadores) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al verificar jugador",
                error: error.message
            });
        }

        if (jugadores.length === 0) {
            return res.status(404).json({
                mensaje: "El jugador no existe"
            });
        }

        // Verificar videojuego
        const sqlVideojuego = "SELECT id FROM videojuegos WHERE id = ?";

        db.query(sqlVideojuego, [videojuego_id], (error, videojuegos) => {
            if (error) {
                return res.status(500).json({
                    mensaje: "Error al verificar videojuego",
                    error: error.message
                });
            }

            if (videojuegos.length === 0) {
                return res.status(404).json({
                    mensaje: "El videojuego no existe"
                });
            }

            // Registrar puntuación
            const sql = `
                INSERT INTO puntuaciones
                (jugador_id, videojuego_id, puntuacion)
                VALUES (?, ?, ?)
            `;

            db.query(
                sql,
                [jugador_id, videojuego_id, puntuacion],
                (error, resultado) => {
                    if (error) {
                        return res.status(500).json({
                            mensaje: "Error al registrar puntuación",
                            error: error.message
                        });
                    }

                    res.status(201).json({
                        mensaje: "Puntuación registrada correctamente",
                        id: resultado.insertId
                    });
                }
            );
        });
    });
};


// Consultar todas las puntuaciones
const obtenerPuntuaciones = (req, res) => {
    const sql = `
        SELECT
            p.id,
            j.nombre AS jugador,
            j.gamertag,
            v.nombre AS videojuego,
            p.puntuacion,
            p.fecha
        FROM puntuaciones p
        INNER JOIN jugadores j ON p.jugador_id = j.id
        INNER JOIN videojuegos v ON p.videojuego_id = v.id
        ORDER BY p.fecha DESC
    `;

    db.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al obtener puntuaciones",
                error: error.message
            });
        }

        res.status(200).json(resultados);
    });
};


// Actualizar puntuación
const actualizarPuntuacion = (req, res) => {
    const { id } = req.params;
    const { jugador_id, videojuego_id, puntuacion } = req.body;

    if (!jugador_id || !videojuego_id || puntuacion === undefined) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    if (puntuacion < 0) {
        return res.status(400).json({
            mensaje: "La puntuación no puede ser negativa"
        });
    }

    const sql = `
        UPDATE puntuaciones
        SET jugador_id = ?, videojuego_id = ?, puntuacion = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [jugador_id, videojuego_id, puntuacion, id],
        (error, resultado) => {
            if (error) {
                return res.status(500).json({
                    mensaje: "Error al actualizar puntuación",
                    error: error.message
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Puntuación no encontrada"
                });
            }

            res.status(200).json({
                mensaje: "Puntuación actualizada correctamente"
            });
        }
    );
};


// Eliminar puntuación
const eliminarPuntuacion = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM puntuaciones WHERE id = ?";

    db.query(sql, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al eliminar puntuación",
                error: error.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Puntuación no encontrada"
            });
        }

        res.status(200).json({
            mensaje: "Puntuación eliminada correctamente"
        });
    });
};


// Obtener ranking
const obtenerRanking = (req, res) => {
    const sql = `
        SELECT
            ROW_NUMBER() OVER (ORDER BY p.puntuacion DESC) AS posicion,
            j.gamertag AS jugador,
            v.nombre AS videojuego,
            p.puntuacion
        FROM puntuaciones p
        INNER JOIN jugadores j ON p.jugador_id = j.id
        INNER JOIN videojuegos v ON p.videojuego_id = v.id
        ORDER BY p.puntuacion DESC
    `;

    db.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al obtener ranking",
                error: error.message
            });
        }

        res.status(200).json(resultados);
    });
};
// Obtener estadísticas
const obtenerEstadisticas = (req, res) => {
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM jugadores) AS total_jugadores,
            (SELECT COUNT(*) FROM videojuegos) AS total_videojuegos,
            (SELECT COUNT(*) FROM puntuaciones) AS total_puntuaciones,
            (SELECT COALESCE(AVG(puntuacion), 0) FROM puntuaciones) AS promedio_puntuacion
    `;

    db.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al obtener estadísticas",
                error: error.message
            });
        }

        res.status(200).json(resultados[0]);
    });
};
// Exportar funciones
module.exports = {
    crearPuntuacion,
    obtenerPuntuaciones,
    obtenerRanking,
    obtenerEstadisticas,
    actualizarPuntuacion,
    eliminarPuntuacion
};

