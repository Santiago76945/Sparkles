//buttonRoutes.js

document.addEventListener('DOMContentLoaded', function () {
    // Variables globales
    const unlockAllLevels = true; // Cambia a 'false' para desactivar el desbloqueo
    const demoMode = true; // Cambia a 'false' para desactivar el modo demo

    // Redirección para 'spanishFromEnglishButton'
    const spanishButton = document.getElementById('spanishFromEnglishButton');
    if (spanishButton) {
        spanishButton.addEventListener('click', function (event) {
            event.preventDefault(); // Evita la redirección inmediata
            setTimeout(function () {
                window.location.href = '/pages/spanishFromEnglish/home.html'; // Redirige después de 1 segundo
            }, 1000); // Espera 1 segundo para redirigir
        });
    }

    // Redirección para 'ESPfromSPA_beginnerSpanishButton' (antes 'A1SpanishFromEnglishButton')
    const beginnerButton = document.getElementById('ESPfromSPA_beginnerSpanishButton');
    if (beginnerButton) {
        beginnerButton.addEventListener('click', function (event) {
            event.preventDefault(); // Evita la redirección inmediata
            setTimeout(function () {
                window.location.href = '/pages/spanishFromEnglish/A1.html'; // Redirige después de 1 segundo
            }, 1000); // Espera 1 segundo para redirigir
        });
    }

    // Redirección para botones dentro de 'lessonSelector'
    const lessonButtons = document.querySelectorAll('.lessonSelector button');
    lessonButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Evita la redirección inmediata

            // Verificar si el modo demo está activado
            if (demoMode) {
                const id = button.id;
                if (!id.startsWith('ESPfromENG-A1-Lev1')) {
                    alert('This is a Sparkles technical demo, only level one is available.');
                    return;
                }
            }

            // Verificar si el botón tiene la clase 'levelUnlocked' o si la booleana 'unlockAllLevels' está activada
            if (button.classList.contains('levelUnlocked') || unlockAllLevels) {
                // Obtiene las letras 11 y 12 del id del botón
                const id = button.id;
                const lessonCode = id.substring(11, 13); // Obtiene las letras 11 y 12

                // Crea la ruta de redirección usando las letras obtenidas
                const redirectUrl = `${lessonCode}lessons/${id}.html`;

                // Redirige después de 1 segundo
                setTimeout(function () {
                    window.location.href = redirectUrl;
                }, 1000); // Espera 1 segundo para redirigir
            } else {
                // Muestra el alert si el nivel está bloqueado
                alert('This level is currently blocked, play the lesson before to unlock it.');
            }
        });
    });

    // Redirección para 'petButton'
    const petButton = document.getElementById('petButton');
    if (petButton) {
        petButton.addEventListener('click', function (event) {
            event.preventDefault(); // Evita la redirección inmediata
            setTimeout(function () {
                window.location.href = '/pages/sparky.html'; // Redirige a la ruta absoluta
            }, 1000); // Espera 1 segundo para redirigir
        });
    }

    // Redirección para 'backToLessonsSelector'
    const backToLessonsButtons = document.querySelectorAll('.backToLessonsSelector');
    backToLessonsButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault(); // Evita la redirección inmediata
            // Redirige a la página anterior
            window.history.back();
        });
    });
});









