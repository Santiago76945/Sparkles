// Booleano para activar el modo de testeo
const modoTesteo = false; // Cambia esto a false para desactivar

// Obtener el valor de la última lección completada desde localStorage
let ultimaLeccionCompletada = localStorage.getItem('esEnUltimaLeccion') || '0';

// Mostrar la última lección completada en la parte superior si el modo de testeo está activado
function mostrarUltimaLeccion() {
    if (modoTesteo) {
        const leccionInfo = document.createElement('div');
        leccionInfo.style.position = 'absolute';
        leccionInfo.style.top = '0';
        leccionInfo.style.left = '0';
        leccionInfo.style.width = '100%';
        leccionInfo.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        leccionInfo.style.color = 'black';
        leccionInfo.style.fontSize = '12px';
        leccionInfo.style.textAlign = 'center';
        leccionInfo.style.zIndex = '9999';
        leccionInfo.textContent = `Última lección completada: ${ultimaLeccionCompletada}`;
        document.body.appendChild(leccionInfo);
    }
}

// Función para generar una lista ordenada de todas las lecciones a partir del HTML
function obtenerListaDeLecciones() {
    const niveles = document.querySelectorAll('.level');
    let listaLecciones = [];

    niveles.forEach(nivel => {
        const lecciones = nivel.querySelectorAll('.lessons button');
        lecciones.forEach(leccion => {
            listaLecciones.push(leccion.id);
        });
    });

    return listaLecciones;
}

// Función para configurar lecciones, desbloqueos y bloqueos
function configurarLecciones() {
    const listaLecciones = obtenerListaDeLecciones();
    const ultimaLeccionIndex = listaLecciones.indexOf(ultimaLeccionCompletada);

    listaLecciones.forEach((leccionId, index) => {
        const leccion = document.getElementById(leccionId);

        if (index <= ultimaLeccionIndex + 1) {
            // Desbloquear lección y agregar clase 'levelUnlocked'
            leccion.className = `levelUnlocked ${leccion.className}`;
        } else {
            // Bloquear la lección: Añadir el emoji de candado
            // leccion.innerHTML += ' 🔒';
        }
    });

    // Asegúrate de que solo la primera lección esté siempre desbloqueada si no hay lecciones completadas
    if (ultimaLeccionCompletada === '0') {
        const primeraLeccion = document.getElementById(listaLecciones[0]);
        if (primeraLeccion) {
            primeraLeccion.className = `levelUnlocked ${primeraLeccion.className}`; // Agregar la clase 'levelUnlocked'
        }
    }
}

// Llamar a la función para configurar las lecciones
document.addEventListener('DOMContentLoaded', () => {
    configurarLecciones();
    mostrarUltimaLeccion();
});








