//lessonCompleted.js

// Function to get the current date in 'YYYY-MM-DD' format
function obtenerFechaActual() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Function to detect if an element is visible on the screen
function isElementVisible(element) {
    return element.offsetParent !== null;
}

// Function to get the lesson code from the HTML document title
function obtenerCodigoLeccion() {
    const fileName = window.location.pathname.split('/').pop(); // Get the file name
    return fileName.replace('.html', ''); // Remove the .html extension
}

// Function to process lesson completion
function procesarLeccionCompletada() {
    const fechaActual = obtenerFechaActual(); // Gets the current date in 'YYYY-MM-DD'

    // Store the completion date in localStorage
    localStorage.setItem('lessonCompletedDate', fechaActual);

    // Increment the streak
    actividadCompletada();

    // Mark the lesson as completed
    const codigoLeccion = obtenerCodigoLeccion();
    actualizarUltimaLeccion(codigoLeccion);

    // Set up redirection when the back button is clicked
    const backButton = document.querySelector('.backToLessonsSelector');
    if (backButton) {
        backButton.addEventListener('click', function() {
            const leccionPrefix = codigoLeccion.slice(11, 13).toUpperCase(); // Get characters 12 and 13 and convert to uppercase
            window.location.href = `../${leccionPrefix}.html`; // Redirect to the corresponding file in the parent folder
        });
    }
}

// Set up a MutationObserver to detect changes in the visibility of the lessonCompleted div
document.addEventListener('DOMContentLoaded', () => {
    const lessonCompletedDiv = document.querySelector('.lessonCompleted');

    if (lessonCompletedDiv) {
        const observer = new MutationObserver(() => {
            if (isElementVisible(lessonCompletedDiv)) {
                procesarLeccionCompletada();
            }
        });

        observer.observe(lessonCompletedDiv, { attributes: true, childList: true, subtree: true });
    }
});

// Function to update the last completed lesson code in localStorage
function actualizarUltimaLeccion(codigoLeccion) {
    localStorage.setItem('ultimaLeccionCompletada', codigoLeccion);
}

// Function to update the streak after completing a lesson
function actividadCompletada() {
    const fechaActual = obtenerFechaActual();

    let streakCount = parseInt(localStorage.getItem('streakCount')) || 0;
    let lastActivityDate = localStorage.getItem('lastActivityDate') || null;

    if (lastActivityDate === null) {
        // If no last activity date is set, start the streak
        streakCount = 1;
    } else {
        const ultimaFecha = new Date(lastActivityDate);
        const fechaHoy = new Date(fechaActual);

        const diferenciaDias = (fechaHoy - ultimaFecha) / (1000 * 60 * 60 * 24);

        if (diferenciaDias === 1) {
            // If the difference is exactly one day, continue the streak
            streakCount++;
        } else if (diferenciaDias > 1) {
            // If the difference is more than one day, reset the streak
            streakCount = 1;
        }
        // If diferenciaDias is 0, the activity was completed on the same day, so the streak does not increase.
    }

    // Save the current date as the last activity date
    lastActivityDate = fechaActual;
    localStorage.setItem('lastActivityDate', lastActivityDate);
    localStorage.setItem('streakCount', streakCount);

    actualizarStreakVisual(streakCount);
}

// Function to update the visual streak counter
function actualizarStreakVisual(streak) {
    const streakCounter = document.getElementById('streakAmount');
    const streakIcon = document.querySelector('#streakCounter img');

    streakCounter.textContent = streak;

    if (streak === 0) {
        streakIcon.src = '../../../images/frozenFire.png'; // Frozen fire image
    } else {
        streakIcon.src = '../../../images/burningFire.png'; // Burning fire image
    }
}

// Function to check if the streak is still active
function verificarRacha() {
    const fechaActual = obtenerFechaActual();

    let lastActivityDate = localStorage.getItem('lastActivityDate') || null;

    if (lastActivityDate === null) {
        // If no last activity date is set, no streak has been started
        actualizarStreakVisual(0);
        return;
    }

    const ultimaFecha = new Date(lastActivityDate);
    const fechaHoy = new Date(fechaActual);

    const diferenciaDias = (fechaHoy - ultimaFecha) / (1000 * 60 * 60 * 24);

    if (diferenciaDias > 1) {
        // If the difference is more than one day, reset the streak
        localStorage.setItem('streakCount', 0);
        actualizarStreakVisual(0);
    } else {
        const streakCount = parseInt(localStorage.getItem('streakCount')) || 0;
        actualizarStreakVisual(streakCount);
    }
}

// Run the function to check the streak when the app starts
document.addEventListener('DOMContentLoaded', verificarRacha);
