\# Sistema de Torneo de Videojuegos



Proyecto para la gestion de un torneo de videojuegos. Permite dar de alta jugadores, juegos y puntuaciones, ademas de mostrar la tabla de clasificacion y estadisticas de las partidas.



\---



\## Equipo de Trabajo



\* \*\*Lester David Uicab Gongora\*\* - Lider de proyecto / Control de versiones (Git) / Pruebas (QA)

\* \*\*Jorge Castañon\*\* - Base de datos (MySQL)

\* \*\*Romel Cruz\*\* - Backend (Node.js y Express)

\* \*\*Miriam Canul\*\* - Frontend (HTML, CSS y JavaScript)



\---



\## Tecnologias



\* Frontend: HTML5, CSS3, JavaScript

\* Backend: Node.js, Express

\* Base de Datos: MySQL

\* Repositorio: Git y GitHub



\---



\## Estructura de Carpetas



\* `/database`: Contiene el script SQL con las tablas y restricciones.

\* `/backend`: Codigo de la API en Express y conexion con MySQL.

\* `/frontend`: Pantallas del sistema (formularios, buscador y tablas).



\---



\## Modulos del Sistema



\* Registro de jugadores con validacion de Gamertag unico.

\* Registro de videojuegos sin permitir nombres repetidos.

\* Captura de puntuaciones asociando jugador y juego (sin admitir valores negativos).

\* Tabla de jugadores registrados con correo y fecha.

\* Tabla de ranking ordenada de mayor a menor puntuacion.

\* Buscador de jugadores por nombre o Gamertag.

\* Panel con total de jugadores, juegos registrados y promedio de puntuacion.



\---



\## Flujo de Trabajo en Git



\* La rama `main` solo contiene codigo estable probado por el equipo.

\* Cada integrante trabaja en su propia rama (`feature/...`) antes de integrar.

\* No se realizan commits directos sobre `main`.

\* En caso de errores, se crean ramas de tipo `fix/...`.



