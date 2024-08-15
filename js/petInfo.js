//petInfo.js

// Función para guardar el nombre de la mascota en localStorage
function savePetName(name) {
    localStorage.setItem('petName', name);
}

// Función para obtener el nombre de la mascota desde localStorage
function getPetName() {
    return localStorage.getItem('petName') || ''; // Retorna el nombre o una cadena vacía si no existe
}