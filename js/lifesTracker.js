// lifesTracker.js

// Booleana para activar o desactivar el botón de reinicio de vidas
const mostrarBotonReinicio = true;

// Booleana para mostrar información de debugging en pantalla
const mostrarInformacionDebug = false;

// Inicializar la cantidad de vidas desde localStorage o en 3 si no existe un valor válido
let lifesCount = parseInt(localStorage.getItem('lifesCount'));

// Función para actualizar las vidas visuales en la interfaz
function actualizarLifesVisual() {
    const heartsContainer = document.getElementById('heartsContainer');
    heartsContainer.innerHTML = ''; 

    for (let i = 1; i <= 3; i++) {
        const heart = document.createElement('img');
        heart.alt = `Heart ${i}`;
        heart.src = (i <= lifesCount) ? '../../../images/pinkHeart.png' : '../../../images/grayHeart.png';
        heartsContainer.appendChild(heart);
    }

    localStorage.setItem('lifesCount', lifesCount);  // Guardar en localStorage
    actualizarInformacionDebug(); // Actualizar información de debugging
}

// Función para restar una vida
function restarVida() {
    if (lifesCount > 0) {
        lifesCount -= 1;
        actualizarLifesVisual();

        // Guardar el nuevo conteo de vidas en localStorage
        localStorage.setItem('lifesCount', lifesCount);
    }

    if (lifesCount === 0) {
        alert("You've run out of lives! You'll be redirected to the level selection screen.");
        // Redirigir a la página anterior (pantalla de selección de niveles)
        window.location.href = document.referrer || '../../../pages/spanishFromEnglish/A1.html'; // Asegúrate de que esta sea la URL correcta de la pantalla de selección de niveles
    }
}

// Función para recargar vidas a las 00:00
function recargarVidasDiarias() {
    const ahora = new Date();
    const ultimaRecarga = new Date(localStorage.getItem('ultimaRecarga') || 0);

    // Comprobar si han pasado más de 24 horas desde la última recarga
    if (
        ahora.getDate() !== ultimaRecarga.getDate() ||
        ahora.getMonth() !== ultimaRecarga.getMonth() ||
        ahora.getFullYear() !== ultimaRecarga.getFullYear()
    ) {
        lifesCount = 3; // Recargar vidas
        actualizarLifesVisual();
        localStorage.setItem('ultimaRecarga', ahora.toString());
    } else {
        // Si no es tiempo de recarga, no hacer nada y mantener el conteo actual
        lifesCount = parseInt(localStorage.getItem('lifesCount')) || 3;
    }

    actualizarInformacionDebug(); // Actualizar información de debugging
}

// Función para reiniciar las vidas a 3
function reiniciarVidas() {
    lifesCount = 3;
    actualizarLifesVisual();
    localStorage.setItem('lifesCount', lifesCount); // Guardar el nuevo conteo de vidas en localStorage
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

// Función para mostrar información de debugging en la parte superior de la pantalla
function actualizarInformacionDebug() {
    if (mostrarInformacionDebug) {
        let debugInfo = document.getElementById('debugInfo');
        if (!debugInfo) {
            debugInfo = document.createElement('div');
            debugInfo.id = 'debugInfo';
            debugInfo.style.position = 'fixed';
            debugInfo.style.top = '20px';
            debugInfo.style.left = '0';
            debugInfo.style.width = '100%';
            debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
            debugInfo.style.color = '#fff';
            debugInfo.style.padding = '10px';
            debugInfo.style.fontSize = '12px';
            debugInfo.style.zIndex = '1001';
            document.body.appendChild(debugInfo);
        }

        const ultimaRecarga = new Date(localStorage.getItem('ultimaRecarga') || 0);
        debugInfo.innerHTML = `Lifes Count: ${lifesCount} | Última recarga de vidas: ${ultimaRecarga.toLocaleString()}`;
    }
}

// Llamar a la función para recargar vidas al iniciar la app
document.addEventListener('DOMContentLoaded', function() {
    recargarVidasDiarias(); // Llamar primero para manejar la recarga diaria

    actualizarLifesVisual(); // Actualizar la visualización de vidas con el conteo actual

    // Si la booleana está activada, agregar el botón de reinicio
    if (mostrarBotonReinicio) {
        agregarBotonReinicio();
    }

    // Mostrar información de debugging si está activada
    actualizarInformacionDebug();
});






