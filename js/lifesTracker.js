// lifesTracker.js

// Booleana para activar o desactivar el botón de reinicio de vidas
const mostrarBotonReinicio = true;

// Inicializar la cantidad de vidas desde localStorage o en 3 si no existe
let lifesCount = parseInt(localStorage.getItem('lifesCount')) || 3;

// Función para actualizar las vidas visuales en la interfaz
function actualizarLifesVisual() {
    const heartsContainer = document.getElementById('heartsContainer');
    heartsContainer.innerHTML = ''; // Limpiar contenido anterior

    for (let i = 1; i <= 3; i++) {
        const heart = document.createElement('img');
        heart.alt = `Heart ${i}`;
        heart.src = (i <= lifesCount) ? '../../../images/pinkHeart.png' : '../../../images/grayHeart.png';
        heartsContainer.appendChild(heart);
    }
    
    // Guardar en localStorage
    localStorage.setItem('lifesCount', lifesCount);
}

// Función para restar una vida
function restarVida() {
    if (lifesCount > 0) {
        lifesCount -= 1;
        actualizarLifesVisual();
    }

    if (lifesCount === 0) {
        alert("You've run out of lives! Please wait until they refresh or try again tomorrow.");
    }
}

// Función para recargar vidas a las 00:00
function recargarVidasDiarias() {
    const ahora = new Date();
    const ultimaRecarga = new Date(localStorage.getItem('ultimaRecarga') || 0);

    // Si han pasado más de 24 horas desde la última recarga, recargar las vidas
    if (ahora.getDate() !== ultimaRecarga.getDate() || ahora.getMonth() !== ultimaRecarga.getMonth() || ahora.getFullYear() !== ultimaRecarga.getFullYear()) {
        lifesCount = 3;
        actualizarLifesVisual();
        localStorage.setItem('ultimaRecarga', ahora.toString());
    }
}

// Función para reiniciar las vidas a 3
function reiniciarVidas() {
    lifesCount = 3;
    actualizarLifesVisual();
}

// Función para agregar el botón de reinicio de vidas
function agregarBotonReinicio() {
    const botonReinicio = document.createElement('button');
    botonReinicio.textContent = "Reiniciar Vidas";
    botonReinicio.style.position = 'absolute';
    botonReinicio.style.top = '30px';
    botonReinicio.style.right = '10px';
    botonReinicio.style.zIndex = '1000';
    botonReinicio.style.padding = '10px';
    botonReinicio.style.backgroundColor = '#f0ad4e'; // Color naranja suave
    botonReinicio.style.color = '#fff';
    botonReinicio.style.border = 'none';
    botonReinicio.style.borderRadius = '5px';
    botonReinicio.style.cursor = 'pointer';

    botonReinicio.addEventListener('click', reiniciarVidas);

    document.body.appendChild(botonReinicio);
}

// Función para guardar vidas cuando se completa la lección
function guardarVidasAlCompletarLeccion() {
    const lessonCompletedDiv = document.querySelector('.lessonCompleted');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.style.display !== 'none') {
                localStorage.setItem('lifesCount', lifesCount);
            }
        });
    });

    observer.observe(lessonCompletedDiv, { attributes: true, attributeFilter: ['style'] });
}

// Llamar a la función para recargar vidas al iniciar la app
document.addEventListener('DOMContentLoaded', function() {
    recargarVidasDiarias();
    actualizarLifesVisual();

    // Si la booleana está activada, agregar el botón de reinicio
    if (mostrarBotonReinicio) {
        agregarBotonReinicio();
    }

    // Guardar las vidas al completar la lección
    guardarVidasAlCompletarLeccion();
});


