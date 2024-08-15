// playerInfo.js

// Función para guardar el nombre del usuario en localStorage
function savePlayerName(name) {
    localStorage.setItem('playerName', name);
}

// Función para obtener el nombre del usuario desde localStorage
function getPlayerName() {
    return localStorage.getItem('playerName') || ''; // Retorna el nombre o una cadena vacía si no existe
}

