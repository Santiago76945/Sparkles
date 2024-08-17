//petInfo.js

// Función para guardar el nombre de la mascota en localStorage
function savePetName(name) {
    localStorage.setItem('petName', name);
}

// Función para obtener el nombre de la mascota desde localStorage
function getPetName() {
    return localStorage.getItem('petName') || ''; // Retorna el nombre o una cadena vacía si no existe
}

// Función para actualizar el nombre de la mascota en el HTML
function updatePetNameInMessage() {
    const petName = getPetName(); // Recupera el nombre de la mascota correctamente
    const petNamePlaceholder = document.getElementById('petNamePlaceholder');
    
    if (petName) {
        petNamePlaceholder.textContent = petName;
    }
}

// Llama a esta función cuando se cargue la página o cuando necesites actualizar el nombre
document.addEventListener('DOMContentLoaded', updatePetNameInMessage);

