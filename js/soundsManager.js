// soundsManager.js

document.addEventListener('DOMContentLoaded', function () {
    // Función para reproducir sonido al hacer clic en un botón
    function playButtonClickSound() {
        const audio = new Audio('/sounds/buttonSound.mp3');
        audio.play();
    }

    // Función para reproducir sonido correcto
    function playCorrectSound() {
        const audio = new Audio('/sounds/correct.mp3');
        audio.play();
    }

    // Función para reproducir sonido incorrecto
    function playIncorrectSound() {
        const audio = new Audio('/sounds/incorrect.mp3');
        audio.play();
    }

    // Función para reproducir la canción de fondo en bucle
    function playBackgroundMusic(musicPath) {
        const backgroundMusic = new Audio(musicPath);
        backgroundMusic.loop = true; // Activar el loop
        backgroundMusic.play().catch(error => {
            console.error('Error playing background music:', error);
        });
    }

    // Agregar eventos a todos los botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Verificar si el botón tiene la clase onClickCorrectAnswer
            if (button.classList.contains('onClickCorrectAnswer')) {
                playCorrectSound();
            } 
            // Verificar si el botón tiene la clase onClickIncorrectAnswer
            else if (button.classList.contains('onClickIncorrectAnswer')) {
                playIncorrectSound();
            } 
            // Si no tiene ninguna de las clases, reproducir el sonido por defecto
            else {
                playButtonClickSound();
            }
        });
    });

    // Iniciar la música de fondo después del primer clic del usuario
    document.addEventListener('click', function initBackgroundMusic() {
        const currentPath = window.location.pathname;
        
        if (currentPath === '/index.html') {
            playBackgroundMusic('/music/sunshinePlayground.mp3');
        } else if (currentPath === '/pages/sparky.html') {
            playBackgroundMusic('/music/happyDays.mp3');
        }

        // Remover el listener después de la primera interacción
        document.removeEventListener('click', initBackgroundMusic);
    });
});




