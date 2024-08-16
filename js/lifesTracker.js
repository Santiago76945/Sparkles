// lifesTracker.js

// Booleana para activar o desactivar el botón de reinicio de vidas
const mostrarBotonReinicio = true;

// Booleana para mostrar información de debugging en pantalla
const mostrarInformacionDebug = true;

// Inicializar la cantidad de vidas desde localStorage o en 3 si no existe un valor válido
let lifesCount = parseInt(localStorage.getItem('lifesCount')) || 3;

// Función para actualizar las vidas visuales en la interfaz
function actualizarLifesVisual() {
    console.log("[actualizarLifesVisual] Iniciando actualización de vidas visuales.");
    const heartsContainer = document.getElementById('heartsContainer');
    heartsContainer.innerHTML = ''; 

    for (let i = 1; i <= 3; i++) {
        const heart = document.createElement('img');
        heart.alt = `Heart ${i}`;
        heart.src = (i <= lifesCount) ? '../../../images/pinkHeart.png' : '../../../images/grayHeart.png';
        heartsContainer.appendChild(heart);
    }

    console.log(`[actualizarLifesVisual] Vidas visuales actualizadas. Cantidad de vidas: ${lifesCount}`);
    localStorage.setItem('lifesCount', lifesCount);  // Guardar en localStorage
    actualizarInformacionDebug(); // Actualizar información de debugging
}

// Función para restar una vida
function restarVida() {
    console.log("[restarVida] Vida restada. Vidas actuales: ", lifesCount);
    if (lifesCount > 0) {
        lifesCount -= 1;
        actualizarLifesVisual();

        // Guardar el nuevo conteo de vidas en localStorage
        localStorage.setItem('lifesCount', lifesCount);
        localStorage.setItem('lifesTimestamp', Date.now()); // Guardar timestamp actualizado
        console.log("[restarVida] Nueva cantidad de vidas guardada en localStorage:", lifesCount);
    }

    if (lifesCount === 0) {
        alert("You've run out of lives! You'll be redirected to the level selection screen.");
        console.log("[restarVida] No quedan vidas. Redirigiendo a la pantalla de selección de niveles.");
        // Redirigir a la página anterior (pantalla de selección de niveles)
        window.location.href = document.referrer || '../../../pages/spanishFromEnglish/A1.html'; // Asegúrate de que esta sea la URL correcta de la pantalla de selección de niveles
    }
}

// Función para recargar vidas a las 00:00 con verificación de tiempo
function recargarVidasDiarias() {
    console.log("[recargarVidasDiarias] Iniciando proceso de recarga de vidas.");
    const ahora = new Date();
    const ultimaRecarga = new Date(localStorage.getItem('ultimaRecarga') || 0);

    // Verificar si la data en localStorage es reciente
    const timestamp = parseInt(localStorage.getItem('lifesTimestamp')) || 0;
    const tiempoActual = ahora.getTime();
    const diferenciaTiempo = tiempoActual - timestamp;

    // Si han pasado más de 24 horas desde la última recarga o si la data es antigua
    if (
        ahora.getDate() !== ultimaRecarga.getDate() ||
        ahora.getMonth() !== ultimaRecarga.getMonth() ||
        ahora.getFullYear() !== ultimaRecarga.getFullYear() ||
        diferenciaTiempo > 86400000 // 24 horas en milisegundos
    ) {
        console.log("[recargarVidasDiarias] Más de 24 horas desde la última recarga o data antigua. Recargando vidas.");
        lifesCount = 3; // Recargar vidas
        actualizarLifesVisual();
        localStorage.setItem('ultimaRecarga', ahora.toString());
        localStorage.setItem('lifesTimestamp', tiempoActual); // Guardar timestamp actualizado
        console.log("[recargarVidasDiarias] Vidas recargadas a 3. Nueva última recarga guardada.");
    } else {
        // Si no es tiempo de recarga, no hacer nada y mantener el conteo actual
        lifesCount = parseInt(localStorage.getItem('lifesCount')) || 3;
        console.log("[recargarVidasDiarias] No es tiempo de recarga. Cantidad de vidas actual:", lifesCount);
    }

    actualizarInformacionDebug(); // Actualizar información de debugging
}

// Función para reiniciar las vidas a 3
function reiniciarVidas() {
    console.log("[reiniciarVidas] Reiniciando vidas a 3.");
    lifesCount = 3;
    actualizarLifesVisual();
    localStorage.setItem('lifesCount', lifesCount); // Guardar el nuevo conteo de vidas en localStorage
    localStorage.setItem('lifesTimestamp', Date.now()); // Guardar timestamp actualizado
    console.log("[reiniciarVidas] Vidas reiniciadas y guardadas en localStorage.");
}

// Función para agregar el botón de reinicio de vidas
function agregarBotonReinicio() {
    console.log("[agregarBotonReinicio] Agregando botón de reinicio de vidas.");
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
    console.log("[agregarBotonReinicio] Botón de reinicio agregado.");
}

// Función para mostrar información de debugging en la parte superior de la pantalla
function actualizarInformacionDebug() {
    if (mostrarInformacionDebug) {
        console.log("[actualizarInformacionDebug] Actualizando información de debugging.");
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
        console.log("[actualizarInformacionDebug] Información de debugging actualizada: ", debugInfo.innerHTML);
    }
}

// Función para guardar lifesCount en localStorage antes de cambiar de página
function guardarLifesAntesDeCambioDePagina() {
    console.log("[guardarLifesAntesDeCambioDePagina] Guardando lifesCount antes de cambiar de página. Cantidad de vidas:", lifesCount);
    localStorage.setItem('lifesCount', lifesCount);
    localStorage.setItem('lifesTimestamp', Date.now()); // Guardar timestamp actualizado
}

// Agregar un evento que se ejecute antes de que el usuario abandone la página
window.addEventListener('beforeunload', guardarLifesAntesDeCambioDePagina);

// Llamar a la función para recargar vidas al iniciar la app
document.addEventListener('DOMContentLoaded', function() {
    console.log("[DOMContentLoaded] Documento cargado. Iniciando recarga de vidas diarias.");

    // Verificar y actualizar las vidas antes de cualquier otra acción
    recargarVidasDiarias();

    actualizarLifesVisual(); // Actualizar la visualización de vidas con el conteo actual

    // Si la booleana está activada, agregar el botón de reinicio
    if (mostrarBotonReinicio) {
        console.log("[DOMContentLoaded] Mostrando botón de reinicio de vidas.");
        agregarBotonReinicio();
    }

    // Mostrar información de debugging si está activada
    actualizarInformacionDebug();
    console.log("[DOMContentLoaded] Proceso de inicialización completado.");
});













