const db = require("../config/database");

// Registrar jugador
const crearJugador = (req, res) => {
    const { nombre, gamertag, correo } = req.body;

    if (!nombre || !gamertag || !correo) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const sql = `
        INSERT INTO jugadores (nombre, gamertag, correo)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [nombre, gamertag, correo], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al registrar jugador",
                error: error.message
            });
        }

        res.status(201).json({
            mensaje: "Jugador registrado correctamente",
            id: resultado.insertId
        });
    });
};


// Consultar todos los jugadores
const obtenerJugadores = (req, res) => {
    const sql = "SELECT * FROM jugadores";

    db.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al obtener jugadores",
                error: error.message
            });
        }

        res.status(200).json(resultados);
    });
};


// Actualizar jugador
const actualizarJugador = (req, res) => {
    const { id } = req.params;
    const { nombre, gamertag, correo } = req.body;

    if (!nombre || !gamertag || !correo) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const sql = `
        UPDATE jugadores
        SET nombre = ?, gamertag = ?, correo = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [nombre, gamertag, correo, id],
        (error, resultado) => {
            if (error) {
                return res.status(500).json({
                    mensaje: "Error al actualizar jugador",
                    error: error.message
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Jugador no encontrado"
                });
            }

            res.status(200).json({
                mensaje: "Jugador actualizado correctamente"
            });
        }
    );
};


// Eliminar jugador
const eliminarJugador = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM jugadores WHERE id = ?";

    db.query(sql, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al eliminar jugador",
                error: error.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Jugador no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Jugador eliminado correctamente"
        });
    });
};


// Exportar funciones
module.exports = {
    crearJugador,
    obtenerJugadores,
    actualizarJugador,
    eliminarJugador
};