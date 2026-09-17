const URL_API = 'http://localhost:3000';

const pestanas = document.querySelectorAll('.pestana');
const secciones = document.querySelectorAll('.seccion');

pestanas.forEach((pestana) => {
  pestana.addEventListener('click', () => {
    const destino = pestana.dataset.seccion;

    pestanas.forEach((p) => p.classList.remove('activa'));
    secciones.forEach((s) => s.classList.remove('activa'));

    pestana.classList.add('activa');
    document.getElementById(destino).classList.add('activa');

    if (destino === 'jugadores') cargarJugadores();
    if (destino === 'videojuegos') cargarVideojuegos();
    if (destino === 'puntuaciones') {
      cargarSelects();
      cargarPuntuaciones();
    }
    if (destino === 'ranking') cargarRanking();
    if (destino === 'estadisticas') cargarEstadisticas();
  });
});

function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = `mensaje ${tipo}`;
}

async function cargarJugadores() {
  try {
    const respuesta = await fetch(`${URL_API}/jugadores`);
    const datos = await respuesta.json();
    const cuerpo = document.getElementById('tabla-jugadores');
    cuerpo.innerHTML = '';

    const lista = Array.isArray(datos) ? datos : (datos.jugadores || []);
    lista.forEach((jugador) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${jugador.gamertag}</td>
        <td>${jugador.correo}</td>
        <td>${new Date(jugador.fecha_registro).toLocaleDateString()}</td>
      `;
      cuerpo.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar jugadores:', error);
  }
}

document.getElementById('form-jugador').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const mensaje = document.getElementById('mensaje-jugador');

  const cuerpo = {
    nombre: document.getElementById('jugador-nombre').value,
    gamertag: document.getElementById('jugador-gamertag').value,
    correo: document.getElementById('jugador-correo').value
  };

  try {
    const respuesta = await fetch(`${URL_API}/jugadores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo)
    });
    const datos = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(mensaje, datos.mensaje, 'exito');
      evento.target.reset();
      cargarJugadores();
    } else {
      mostrarMensaje(mensaje, datos.mensaje || 'Error al registrar', 'error');
    }
  } catch (error) {
    mostrarMensaje(mensaje, 'Error de conexion con el servidor', 'error');
  }
});

async function cargarVideojuegos() {
  try {
    const respuesta = await fetch(`${URL_API}/videojuegos`);
    const datos = await respuesta.json();
    const cuerpo = document.getElementById('tabla-videojuegos');
    cuerpo.innerHTML = '';

    const lista = Array.isArray(datos) ? datos : (datos.videojuegos || []);
    lista.forEach((videojuego) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${videojuego.nombre}</td>
        <td>${videojuego.genero}</td>
      `;
      cuerpo.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar videojuegos:', error);
  }
}

document.getElementById('form-videojuego').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const mensaje = document.getElementById('mensaje-videojuego');

  const cuerpo = {
    nombre: document.getElementById('videojuego-nombre').value,
    genero: document.getElementById('videojuego-genero').value
  };

  try {
    const respuesta = await fetch(`${URL_API}/videojuegos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo)
    });
    const datos = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(mensaje, datos.mensaje, 'exito');
      evento.target.reset();
      cargarVideojuegos();
    } else {
      mostrarMensaje(mensaje, datos.mensaje || 'Error al registrar', 'error');
    }
  } catch (error) {
    mostrarMensaje(mensaje, 'Error de conexion con el servidor', 'error');
  }
});

async function cargarSelects() {
  try {
    const [jugadoresRes, videojuegosRes] = await Promise.all([
      fetch(`${URL_API}/jugadores`),
      fetch(`${URL_API}/videojuegos`)
    ]);
    const jugadoresData = await jugadoresRes.json();
    const videojuegosData = await videojuegosRes.json();

    const selectJugador = document.getElementById('puntuacion-jugador');
    const selectVideojuego = document.getElementById('puntuacion-videojuego');

    const listaJugadores = Array.isArray(jugadoresData) ? jugadoresData : (jugadoresData.jugadores || []);
    const listaVideojuegos = Array.isArray(videojuegosData) ? videojuegosData : (videojuegosData.videojuegos || []);

    selectJugador.innerHTML = listaJugadores
      .map((jugador) => `<option value="${jugador.id}">${jugador.gamertag}</option>`)
      .join('');

    selectVideojuego.innerHTML = listaVideojuegos
      .map((videojuego) => `<option value="${videojuego.id}">${videojuego.nombre}</option>`)
      .join('');
  } catch (error) {
    console.error('Error al cargar selects:', error);
  }
}

async function cargarPuntuaciones() {
  try {
    const respuesta = await fetch(`${URL_API}/puntuaciones`);
    const datos = await respuesta.json();
    const cuerpo = document.getElementById('tabla-puntuaciones');
    if (!cuerpo) return;
    cuerpo.innerHTML = '';

    const lista = Array.isArray(datos) ? datos : (datos.puntuaciones || []);
    lista.forEach((puntuacion) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${puntuacion.jugador || puntuacion.gamertag}</td>
        <td>${puntuacion.videojuego}</td>
        <td>${puntuacion.puntuacion}</td>
        <td>${new Date(puntuacion.fecha).toLocaleDateString()}</td>
      `;
      cuerpo.appendChild(fila);
    });
  } catch (error) {
    console.error('No se pudieron cargar las puntuaciones:', error);
  }
}

document.getElementById('form-puntuacion').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const mensaje = document.getElementById('mensaje-puntuacion');

  const cuerpo = {
    jugador_id: Number(document.getElementById('puntuacion-jugador').value),
    videojuego_id: Number(document.getElementById('puntuacion-videojuego').value),
    puntuacion: Number(document.getElementById('puntuacion-valor').value)
  };

  try {
    const respuesta = await fetch(`${URL_API}/puntuaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo)
    });
    const datos = await respuesta.json();

    if (respuesta.ok) {
      mostrarMensaje(mensaje, datos.mensaje, 'exito');
      document.getElementById('puntuacion-valor').value = '';
      cargarPuntuaciones();
    } else {
      mostrarMensaje(mensaje, datos.mensaje || 'Error al guardar', 'error');
    }
  } catch (error) {
    mostrarMensaje(mensaje, 'Error de conexion con el servidor', 'error');
  }
});

async function cargarRanking() {
  try {
    const respuesta = await fetch(`${URL_API}/puntuaciones/ranking`);
    const datos = await respuesta.json();
    const cuerpo = document.getElementById('tabla-ranking');
    cuerpo.innerHTML = '';

    const lista = Array.isArray(datos) ? datos : (datos.ranking || []);
    lista.forEach((registro, indice) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${registro.posicion || (indice + 1)}</td>
        <td>${registro.jugador}</td>
        <td>${registro.videojuego}</td>
        <td>${registro.puntuacion}</td>
      `;
      cuerpo.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar ranking:', error);
  }
}

async function cargarEstadisticas() {
  try {
    const respuesta = await fetch(`${URL_API}/puntuaciones/estadisticas`);
    const datos = await respuesta.json();

    const stats = datos.estadisticas || datos;
    document.getElementById('stat-jugadores').textContent = stats.total_jugadores ?? stats.totalJugadores ?? 0;
    document.getElementById('stat-videojuegos').textContent = stats.total_videojuegos ?? stats.totalVideojuegos ?? 0;
    document.getElementById('stat-puntuaciones').textContent = stats.total_puntuaciones ?? stats.totalPuntuaciones ?? 0;
    const prom = Number(stats.promedio_puntuacion ?? stats.promedioPuntuacion ?? 0);
    document.getElementById('stat-promedio').textContent = prom.toFixed(1);
  } catch (error) {
    console.error('Error al cargar estadisticas:', error);
  }
}

document.getElementById('boton-buscar').addEventListener('click', async () => {
  const termino = document.getElementById('texto-busqueda').value.trim();
  if (!termino) return;

  try {
    const respuesta = await fetch(`${URL_API}/jugadores/buscar?busqueda=${encodeURIComponent(termino)}`);
    const datos = await respuesta.json();
    const cuerpo = document.getElementById('tabla-busqueda');
    cuerpo.innerHTML = '';

    const lista = Array.isArray(datos) ? datos : (datos.jugadores || []);
    lista.forEach((jugador) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${jugador.gamertag}</td>
        <td>${jugador.correo}</td>
        <td>${new Date(jugador.fecha_registro).toLocaleDateString()}</td>
      `;
      cuerpo.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al buscar jugador:', error);
  }
});

cargarJugadores();