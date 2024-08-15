// Selecciona todos los botones con la clase 'defaultButton'
const buttons = document.querySelectorAll('.defaultButton');

// Añade un evento de click a cada botón
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Remueve la clase 'defaultButton' para eliminar el degradado
        button.classList.remove('defaultButton');

        if (button.classList.contains('onClickCorrectAnswer')) {
            // Añadir la clase de fondo verde si la respuesta es correcta
            button.classList.add('correctAnswerStyle');
        } else if (button.classList.contains('onClickIncorrectAnswer')) {
            // Añadir la clase de fondo rojo si la respuesta es incorrecta y restar una vida
            button.classList.add('incorrectAnswerStyle');
            restarVida(); // Llama a la función para restar una vida desde lifesTracker.js
        }
    });
});


