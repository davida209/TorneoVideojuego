const URL_API = 'http://localhost:4000/api';

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
  });
});

function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = `mensaje ${tipo}`;
}

async function cargarJugadores() {
  const respuesta = await fetch(`${URL_API}/jugadores`);
  const datos = await respuesta.json();
  const cuerpo = document.getElementById('tabla-jugadores');
  cuerpo.innerHTML = '';

  datos.jugadores.forEach((jugador) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${jugador.gamertag}</td>
      <td>${jugador.correo}</td>
      <td>${new Date(jugador.fecha_registro).toLocaleDateString()}</td>
    `;
    cuerpo.appendChild(fila);
  });
}

document.getElementById('form-jugador').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const mensaje = document.getElementById('mensaje-jugador');

  const cuerpo = {
    nombre: document.getElementById('jugador-nombre').value,
    gamertag: document.getElementById('jugador-gamertag').value,
    correo: document.getElementById('jugador-correo').value
  };

  const respuesta = await fetch(`${URL_API}/jugadores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo)
  });
  const datos = await respuesta.json();

  mostrarMensaje(mensaje, datos.mensaje, datos.ok ? 'exito' : 'error');

  if (datos.ok) {
    evento.target.reset();
    cargarJugadores();
  }
});

async function cargarVideojuegos() {
  const respuesta = await fetch(`${URL_API}/videojuegos`);
  const datos = await respuesta.json();
  const cuerpo = document.getElementById('tabla-videojuegos');
  cuerpo.innerHTML = '';

  datos.videojuegos.forEach((videojuego) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${videojuego.nombre}</td>
      <td>${videojuego.genero}</td>
    `;
    cuerpo.appendChild(fila);
  });
}

document.getElementById('form-videojuego').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const mensaje = document.getElementById('mensaje-videojuego');

  const cuerpo = {
    nombre: document.getElementById('videojuego-nombre').value,
    genero: document.getElementById('videojuego-genero').value
  };

  const respuesta = await fetch(`${URL_API}/videojuegos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo)
  });
  const datos = await respuesta.json();

  mostrarMensaje(mensaje, datos.mensaje, datos.ok ? 'exito' : 'error');

  if (datos.ok) {
    evento.target.reset();
    cargarVideojuegos();
  }
});

async function cargarSelects() {
  const [jugadoresRes, videojuegosRes] = await Promise.all([
    fetch(`${URL_API}/jugadores`),
    fetch(`${URL_API}/videojuegos`)
  ]);
  const jugadoresData = await jugadoresRes.json();
  const videojuegosData = await videojuegosRes.json();

  const selectJugador = document.getElementById('puntuacion-jugador');
  const selectVideojuego = document.getElementById('puntuacion-videojuego');

  selectJugador.innerHTML = jugadoresData.jugadores
    .map((jugador) => `<option value="${jugador.id}">${jugador.gamertag}</option>`)
    .join('');

  selectVideojuego.innerHTML = videojuegosData.videojuegos
    .map((videojuego) => `<option value="${videojuego.id}">${videojuego.nombre}</option>`)
    .join('');
}

async function cargarPuntuaciones() {
  try {
    const respuesta = await fetch(`${URL_API}/puntuaciones`);
    const datos = await respuesta.json();
    const cuerpo = document.getElementById('tabla-puntuaciones');
    if (!cuerpo) return;
    cuerpo.innerHTML = '';

    if (datos.puntuaciones) {
      datos.puntuaciones.forEach((puntuacion) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${puntuacion.jugador}</td>
          <td>${puntuacion.videojuego}</td>
          <td>${puntuacion.puntuacion}</td>
          <td>${new Date(puntuacion.fecha).toLocaleDateString()}</td>
        `;
        cuerpo.appendChild(fila);
      });
    }
  } catch (error) {
    console.error('No se pudieron cargar las puntuaciones', error);
  }
}

document.getElementById('form-puntuacion').addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const mensaje = document.getElementById('mensaje-puntuacion');

  const cuerpo = {
    jugadorId: document.getElementById('puntuacion-jugador').value,
    videojuegoId: document.getElementById('puntuacion-videojuego').value,
    puntuacion: document.getElementById('puntuacion-valor').value
  };

  const respuesta = await fetch(`${URL_API}/puntuaciones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo)
  });
  const datos = await respuesta.json();

  mostrarMensaje(mensaje, datos.mensaje, datos.ok ? 'exito' : 'error');

  if (datos.ok) {
    document.getElementById('puntuacion-valor').value = '';
    cargarPuntuaciones();
  }
});

async function cargarRanking() {
  const respuesta = await fetch(`${URL_API}/ranking`);
  const datos = await respuesta.json();
  const cuerpo = document.getElementById('tabla-ranking');
  cuerpo.innerHTML = '';

  datos.ranking.forEach((registro, indice) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${indice + 1}</td>
      <td>${registro.jugador}</td>
      <td>${registro.videojuego}</td>
      <td>${registro.puntuacion}</td>
    `;
    cuerpo.appendChild(fila);
  });
}

cargarJugadores();