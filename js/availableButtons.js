// availableButtons.js

// Configuración de disponibilidad de los botones
const buttonAvailability = {
    A1: true,
    A2: false,
    B1: false,
    B2: false,
    C1: false
};

// Función para inicializar los botones
function initializeButtons() {
    const buttons = [
        { id: 'ESPfromSPA_beginnerSpanishButton', available: buttonAvailability.A1 },
        { id: 'ESPfromSPA_elementarySpanishButton', available: buttonAvailability.A2 },
        { id: 'ESPfromSPA_intermediateSpanishButton', available: buttonAvailability.B1 },
        { id: 'ESPfromSPA_upperIntermediateSpanishButton', available: buttonAvailability.B2 },
        { id: 'ESPfromSPA_advancedSpanishButton', available: buttonAvailability.C1 }
    ];

    buttons.forEach(button => {
        const element = document.getElementById(button.id);
        if (button.available) {
            // No se hace nada, se mantiene el estilo predeterminado
        } else {
            // Añadir estilo para botón no disponible
            element.classList.add('notAvailableStyle');
            // Añadir evento click para mostrar el mensaje de alerta
            element.addEventListener('click', function (event) {
                event.preventDefault(); // Prevenir acción por defecto
                alert('We are working hard to bring you more content soon.');
            });
        }
    });
}

// Llamar a la función para inicializar los botones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initializeButtons);
