// userSelections.js

// Booleana para activar o desactivar el script
const scriptEnabled = false;

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el script está habilitado
    if (!scriptEnabled) {
        return;
    }

    // Obtener la selección previa del usuario desde localStorage
    const selectedCourse = localStorage.getItem('selectedCourse');

    // Si hay un curso seleccionado previamente, redirigir automáticamente a la página correspondiente
    if (selectedCourse) {
        setTimeout(function() {
            window.location.href = `/pages/spanishFromEnglish/${selectedCourse}.html`;
        }, 1000); // 1 segundo de retraso
    }

    // Agregar listeners a cada botón para guardar la selección y redirigir
    const buttons = [
        { id: 'ESPfromSPA_beginnerSpanishButton', page: 'A1' },
        { id: 'ESPfromSPA_elementarySpanishButton', page: 'A2' },
        { id: 'ESPfromSPA_intermediateSpanishButton', page: 'B1' },
        { id: 'ESPfromSPA_upperIntermediateSpanishButton', page: 'B2' },
        { id: 'ESPfromSPA_advancedSpanishButton', page: 'C1' }
    ];

    buttons.forEach(button => {
        const element = document.getElementById(button.id);
        if (element) {
            element.addEventListener('click', function() {
                // Guardar la selección del curso en localStorage
                localStorage.setItem('selectedCourse', button.page);

                // Redirigir a la página específica después de 1 segundo
                setTimeout(function() {
                    window.location.href = `/pages/spanishFromEnglish/${button.page}.html`;
                }, 1000); // 1 segundo de retraso
            });
        }
    });
});






