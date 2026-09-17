const express = require("express");
const cors = require("cors");

const jugadoresRoutes = require("./routes/jugadores");
const videojuegosRoutes = require("./routes/videojuegos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jugadores", jugadoresRoutes);
app.use("/videojuegos", videojuegosRoutes);

// Conexión con MySQL
require("./config/database");

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        mensaje: "Backend del torneo funcionando"
    });
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});

