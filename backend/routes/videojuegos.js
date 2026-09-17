const express = require("express");

const router = express.Router();

const {
    crearVideojuego,
    obtenerVideojuegos,
    actualizarVideojuego,
    eliminarVideojuego
} = require("../controllers/videojuegosController");

router.post("/", crearVideojuego);

router.get("/", obtenerVideojuegos);

router.put("/:id", actualizarVideojuego);

router.delete("/:id", eliminarVideojuego);

module.exports = router;