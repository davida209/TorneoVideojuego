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

router.get("/ranking", obtenerRanking);

router.get("/", obtenerPuntuaciones);

router.put("/:id", actualizarPuntuacion);

module.exports = router;