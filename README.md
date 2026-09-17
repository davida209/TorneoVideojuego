\# Sistema de Torneo de Videojuegos



Proyecto para la gestion de un torneo de videojuegos. Permite dar de alta jugadores, juegos y puntuaciones, ademas de mostrar la tabla de clasificacion y estadisticas de las partidas.



\---



\## Equipo de Trabajo



\* \*\*Lester David Uicab Gongora\*\* - Lider de proyecto / Control de versiones (Git) / Pruebas (QA)

\* \*\*Jorge Castañon\*\* - Base de datos 

\* \*\*Romel Cruz\*\* - Backend 

\* \*\*Miriam Canul\*\* - Frontend 



\---



\## Estructura de Carpetas



\* `/database`: Contiene el script SQL con las tablas y restricciones.

\* `/backend`: Codigo y conexion con MySQL.

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



## Documentación y Pruebas (QA)

* [Ver Reporte de Pruebas Funcionales con Evidencias](docs/QA_REPORT.md)
* [Ver Bitácora de Defectos e Incidentes (Bug Report)](docs/BUG_REPORT.md)
