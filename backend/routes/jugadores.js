const express = require("express");

const router = express.Router();

const {
    crearJugador,
    obtenerJugadores,
    buscarJugador,
    actualizarJugador,
    eliminarJugador
} = require("../controllers/jugadoresController");

router.post("/", crearJugador);

router.get("/buscar", buscarJugador);

router.get("/", obtenerJugadores);

router.put("/:id", actualizarJugador);

router.delete("/:id", eliminarJugador);

module.exports = router;
