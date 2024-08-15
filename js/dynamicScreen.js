document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los contenedores con la clase 'dynamicScreen'
    const dynamicScreens = document.querySelectorAll('.dynamicScreen');

    dynamicScreens.forEach(screen => {
        let currentIndex = 0;
        const childDivs = Array.from(screen.children);

        // Oculta todos los divs hijos excepto el primero
        childDivs.forEach((div, index) => {
            if (index !== 0) {
                div.style.display = 'none';
            }
        });

        // Añade un event listener solo a los botones con la clase 'onClickActivateNextDiv'
        screen.addEventListener('click', function(event) {
            if (event.target.closest('.onClickActivateNextDiv')) {
                // Oculta el div actual
                childDivs[currentIndex].style.display = 'none';

                // Incrementa el índice para avanzar al siguiente div
                currentIndex++;

                // Si aún hay más divs, muestra el siguiente
                if (currentIndex < childDivs.length) {
                    childDivs[currentIndex].style.display = 'block';
                }
            }
        });
    });
});



