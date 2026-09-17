const express = require("express");

const router = express.Router();

const {
    crearPuntuacion,
    obtenerPuntuaciones,
    obtenerRanking,
    obtenerEstadisticas,
    actualizarPuntuacion,
    eliminarPuntuacion
} = require("../controllers/puntuacionesController");

router.post("/", crearPuntuacion);

router.get("/estadisticas", obtenerEstadisticas);

router.get("/", obtenerPuntuaciones);

router.put("/:id", actualizarPuntuacion);

router.delete("/:id", eliminarPuntuacion);

module.exports = router;