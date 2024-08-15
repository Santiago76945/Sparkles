//sparksTracker.js

// Inicializa la cantidad de Sparks desde localStorage o en 0 si no existe
let sparksCount = parseInt(localStorage.getItem('sparksCount')) || 0;

// Función para actualizar la cantidad de Sparks en localStorage y en la interfaz
function actualizarSparksVisual() {
    const sparksCounter = document.getElementById('sparksAmount');
    sparksCounter.textContent = sparksCount;
    localStorage.setItem('sparksCount', sparksCount);
}

// Función para agregar Sparks
function agregarSparks(puntos) {
    sparksCount += puntos;
    actualizarSparksVisual();
}

// Función para restar Sparks
function restarSparks(puntos) {
    sparksCount = Math.max(0, sparksCount - puntos); // Asegura que no baje de 0
    actualizarSparksVisual();
}

// Inicializa el valor visual de Sparks cuando se carga la página
document.addEventListener('DOMContentLoaded', actualizarSparksVisual);
