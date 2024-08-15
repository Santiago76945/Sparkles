//inputField.js

// Obtener los elementos del DOM
const userNameInput = document.getElementById('userName');
const petNameInput = document.getElementById('petName');
const submitButton = document.getElementById('submitButton');
const warningMessage = document.getElementById('warningMessage');

// Función para habilitar el botón si ambos campos están llenos
function toggleButtonState() {
    if (userNameInput.value.trim() !== '' && petNameInput.value.trim() !== '') {
        submitButton.disabled = false; // Habilita el botón
        warningMessage.style.display = 'none'; // Oculta el mensaje de advertencia
    } else {
        submitButton.disabled = true; // Deshabilita el botón
        warningMessage.style.display = 'block'; // Muestra el mensaje de advertencia
    }
}

// Listener para guardar los nombres y avanzar cuando se presiona el botón
submitButton.addEventListener('click', function(event) {
    const userName = userNameInput.value.trim();
    const petName = petNameInput.value.trim();

    if (userName !== '' && petName !== '') {
        savePlayerName(userName); // Guardar el nombre del usuario
        savePetName(petName); // Guardar el nombre de la mascota
        console.log(`Player Name: ${userName}, Pet Name: ${petName} saved successfully!`);

        // Mover al siguiente div sin simular un clic
        event.preventDefault(); // Prevenir cualquier comportamiento por defecto
        avanzarAlSiguienteDiv(); // Llamar a la función directamente
    }
});

// Función para avanzar al siguiente div
function avanzarAlSiguienteDiv() {
    const dynamicScreen = document.querySelector('.dynamicScreen');
    const currentScreen = dynamicScreen.querySelector('div.onScreenMessage:not([style*="display: none"])');
    const nextScreen = currentScreen.nextElementSibling;

    if (nextScreen) {
        currentScreen.style.display = 'none';
        nextScreen.style.display = 'block';
    }
}

// Añadir listeners para habilitar el botón cuando los campos estén llenos
userNameInput.addEventListener('input', toggleButtonState);
petNameInput.addEventListener('input', toggleButtonState);
