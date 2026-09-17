const express = require("express");

const router = express.Router();

const {
    crearPuntuacion,
    obtenerPuntuaciones,
    actualizarPuntuacion,
    eliminarPuntuacion
} = require("../controllers/puntuacionesController");

router.post("/", crearPuntuacion);

router.get("/", obtenerPuntuaciones);

router.put("/:id", actualizarPuntuacion);

router.delete("/:id", eliminarPuntuacion);

module.exports = router;