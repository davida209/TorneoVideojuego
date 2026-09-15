const URL_API = 'http://localhost:4000/api';

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

    datos.jugadores.forEach((jugador) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${jugador.id}</td>
        <td>${jugador.nombre}</td>
        <td>${jugador.gamertag}</td>
        <td>${jugador.correo}</td>
        <td>${new Date(jugador.fecha_registro).toLocaleDateString()}</td>
      `;
      cuerpo.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar los jugadores:', error);
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

    if (datos.ok) {
      mostrarMensaje(mensaje, 'Se registró el jugador', 'exito');
      evento.target.reset();
      cargarJugadores();
    } else {
      mostrarMensaje(mensaje, 'No se pudo registrar el jugador', 'error');
    }
  } catch (error) {
    mostrarMensaje(mensaje, 'No se pudo registrar el jugador', 'error');
  }
});

cargarJugadores();