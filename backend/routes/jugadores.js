const express = require("express");

const router = express.Router();

const {
    crearJugador,
    obtenerJugadores,
    actualizarJugador,
    eliminarJugador
} = require("../controllers/jugadoresController");

router.post("/", crearJugador);

router.get("/", obtenerJugadores);

router.put("/:id", actualizarJugador);

router.delete("/:id", eliminarJugador);

module.exports = router;