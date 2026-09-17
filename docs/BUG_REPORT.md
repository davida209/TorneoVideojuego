# Reporte de Errores Encontrados en Pruebas 

**Responsable:** Lester David Uicab Gongora  
**Proyecto:** Torneo de Videojuegos  

---

### Error 1: Puerto y URL equivocada en el front
* **Problema:** El servidor de Node está configurado para correr en el puerto 3000 con rutas directas (`/jugadores`, `/videojuegos`, `/puntuaciones`), pero en el script del front se estaba llamando a `http://localhost:4000/api`.
* **Resultado:** La página no podía comunicarse con el servidor y marcaba error de conexión (`ERR_CONNECTION_REFUSED`).
* **Solución:** Se corrigió la variable en `script.js` para que apunte a `http://localhost:3000`.

---

### Error 2: Incompatibilidad con los datos que manda el backend
* **Problema:** Los controladores de Express devuelven un arreglo directo de datos (`res.json(resultados)`), pero en el frontend se intentaba recorrer como si vinieran dentro de un objeto (`datos.jugadores.forEach`).
* **Resultado:** La consola del navegador lanzaba error de tipo `Cannot read properties of undefined (reading 'forEach')` y no se llenaban las tablas.
* **Solución:** Se ajustaron las funciones de carga para verificar si la respuesta es un arreglo directo antes de recorrerlo.

---

### Error 3: Nombres de campos diferentes al guardar puntuación
* **Problema:** En el backend el controlador pide obligatoriamente `jugador_id` y `videojuego_id` En cambio, el formulario en el front los estaba enviando como `jugadorId` y `videojuegoId`.
* **Resultado:** El servidor respondía con error 400 avisando que faltaban campos obligatorios y no dejaba guardar.
* **Solución:** Se cambiaron los nombres de las propiedades en el envío del formulario para que coincidan exactamente con lo que espera el backend.

---

### Error 4: Parámetro incorrecto en el buscador
* **Problema:** Al dar clic en buscar, el front mandaba el texto con el parámetro `?q=`, pero el backend está programado para recibir `req.query.busqueda`.
* **Resultado:** La búsqueda siempre fallaba con un error 400 pidiendo ingresar un nombre o gamertag.
* **Solución:** Se cambió la petición a `/jugadores/buscar?busqueda=`.
---
