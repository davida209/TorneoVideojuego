const db = require("../config/database");

// Registrar videojuego
const crearVideojuego = (req, res) => {
    const { nombre, genero } = req.body;

    if (!nombre || !genero) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const sql = `
        INSERT INTO videojuegos (nombre, genero)
        VALUES (?, ?)
    `;

    db.query(sql, [nombre, genero], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al registrar videojuego",
                error: error.message
            });
        }

        res.status(201).json({
            mensaje: "Videojuego registrado correctamente",
            id: resultado.insertId
        });
    });
};


// Consultar todos los videojuegos
const obtenerVideojuegos = (req, res) => {
    const sql = "SELECT * FROM videojuegos";

    db.query(sql, (error, resultados) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al obtener videojuegos",
                error: error.message
            });
        }

        res.status(200).json(resultados);
    });
};


// Actualizar videojuego
const actualizarVideojuego = (req, res) => {
    const { id } = req.params;
    const { nombre, genero } = req.body;

    if (!nombre || !genero) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const sql = `
        UPDATE videojuegos
        SET nombre = ?, genero = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [nombre, genero, id],
        (error, resultado) => {
            if (error) {
                return res.status(500).json({
                    mensaje: "Error al actualizar videojuego",
                    error: error.message
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "Videojuego no encontrado"
                });
            }

            res.status(200).json({
                mensaje: "Videojuego actualizado correctamente"
            });
        }
    );
};


// Eliminar videojuego
const eliminarVideojuego = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM videojuegos WHERE id = ?";

    db.query(sql, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al eliminar videojuego",
                error: error.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Videojuego no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Videojuego eliminado correctamente"
        });
    });
};


// Exportar funciones
module.exports = {
    crearVideojuego,
    obtenerVideojuegos,
    actualizarVideojuego,
    eliminarVideojuego
};