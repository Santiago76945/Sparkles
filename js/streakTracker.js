//streakTracker.js

// Obtener la cantidad de días en racha y la última fecha de actividad desde localStorage
let streakCount = parseInt(localStorage.getItem('streakCount')) || 0;
let lastActivityDate = localStorage.getItem('lastActivityDate') || null;

// Función para obtener la fecha en formato 'YYYY-MM-DD'
function obtenerFechaActual() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Esto devuelve la fecha en formato 'YYYY-MM-DD'
}

// Función para verificar si la racha sigue activa
function verificarRacha() {
    const fechaActual = obtenerFechaActual();

    if (lastActivityDate === null) {
        // No hay racha iniciada, mostrar el fuego congelado
        actualizarStreakVisual(0);
    } else {
        const ultimaFecha = new Date(lastActivityDate);
        const fechaHoy = new Date(fechaActual);

        const diferenciaDias = (fechaHoy - ultimaFecha) / (1000 * 60 * 60 * 24);

        if (diferenciaDias === 1) {
            // Si es el día siguiente, aumentar la racha
            streakCount++;
        } else if (diferenciaDias > 1) {
            // Si han pasado más de un día, reiniciar la racha
            streakCount = 0;
        }

        // Actualizar la visualización del contador de rachas
        actualizarStreakVisual(streakCount);

        // Guardar la nueva fecha de última actividad y la racha
        localStorage.setItem('lastActivityDate', fechaActual);
        localStorage.setItem('streakCount', streakCount);
    }
}

// Función para actualizar la visualización de la racha
function actualizarStreakVisual(streak) {
    const streakCounter = document.getElementById('streakAmount');
    const streakIcon = document.querySelector('#streakCounter img');

    streakCounter.textContent = streak;

    if (streak > 0) {
        streakIcon.src = '../../../images/burningFire.png'; // Imagen del fuego normal
    } else {
        streakIcon.src = '../../../images/frozenFire.png'; // Imagen del fuego congelado
    }
}

// Llamar a la función verificarRacha cuando se inicie la app
document.addEventListener('DOMContentLoaded', verificarRacha);
