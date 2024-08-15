//welcomeScreen.js

// Crear el contenedor principal y el botón de inicio
const setupScreen = () => {
    const welcomeScreen = document.createElement('div');
    welcomeScreen.id = 'welcomeScreen';
    welcomeScreen.style.position = 'fixed';
    welcomeScreen.style.top = '0';
    welcomeScreen.style.left = '0';
    welcomeScreen.style.width = '100vw';
    welcomeScreen.style.height = '100vh';
    welcomeScreen.style.display = 'flex';
    welcomeScreen.style.justifyContent = 'center';
    welcomeScreen.style.alignItems = 'center';
    welcomeScreen.style.flexDirection = 'column';
    welcomeScreen.style.background = 'linear-gradient(to top, rgba(245, 181, 203, 1), rgba(143, 155, 179, 1))';

    const logo = new Image();
    logo.src = 'images/logo.png';
    logo.style.width = '300px'; // Aumentado al 50%
    logo.style.marginBottom = '20px';

    // Definir la animación directamente en el estilo del logo
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.75)';
    logo.style.transition = 'opacity 1s ease-in-out, transform 1s ease-in-out';

    // Esperar un pequeño delay para asegurar que la transición se aplique
    setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1)';
    }, 100);

    welcomeScreen.appendChild(logo);

    const startButton = document.createElement('button');
    startButton.innerText = 'START';

    // Estilo del botón
    startButton.style.padding = '15px 30px';
    startButton.style.border = 'none';
    startButton.style.background = 'transparent';  // Fondo transparente
    startButton.style.color = '#fff';
    startButton.style.fontSize = '18px';
    startButton.style.fontWeight = 'bold'; // Aumenta el peso del texto
    startButton.style.borderRadius = '5px';  // Borde redondeado más pequeño
    startButton.style.cursor = 'pointer';
    startButton.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)'; // Sombra sutil
    startButton.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3)'; // Sombra al texto
    startButton.style.transition = 'transform 0.2s ease-in-out'; // Animación de transformación

    startButton.addEventListener('mouseover', () => {
        startButton.style.transform = 'scale(1.1)'; // Aumenta el tamaño al pasar el mouse
    });

    startButton.addEventListener('mouseout', () => {
        startButton.style.transform = 'scale(1)'; // Vuelve al tamaño original
    });

    startButton.onclick = () => document.body.removeChild(welcomeScreen);
    welcomeScreen.appendChild(startButton);

    // Añadir el texto en la parte inferior de la pantalla
    const footerText = document.createElement('div');
    footerText.innerText = "Sparkles, Alpha Version. This is a prototype. All rights reserved to Santiago Haspert. Unauthorized use of this content without the express permission of the owner is prohibited.";
    footerText.style.position = 'absolute';
    footerText.style.bottom = '10px';
    footerText.style.width = '100%';
    footerText.style.textAlign = 'center';
    footerText.style.color = '#fff';
    footerText.style.fontSize = '12px';
    footerText.style.fontStyle = 'italic';

    welcomeScreen.appendChild(footerText);
    document.body.appendChild(welcomeScreen);

    animateSparkles();
};

// Función para animar sparkles en el fondo
const animateSparkles = () => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';  // Asegura que el canvas esté detrás del botón
    document.getElementById('welcomeScreen').appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const sparkles = [];
    const numSparkles = 30;

    // Crear sparkles inicialmente
    for (let i = 0; i < numSparkles; i++) {
        sparkles.push(createSparkle());
    }

    // Función para crear un sparkle
    function createSparkle() {
        const lifetime = Math.random() * 3000 + 2000; // Tiempos de vida entre 2000 y 5000 milisegundos
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 10 + 5, // Tamaño más variable entre 5 y 15
            opacity: 0,
            lifetime,
            maxLifetime: lifetime
        };
    }

    // Función para dibujar un destello en forma de estrella de 4 puntas estilizada
    function drawSparkle(sparkle) {
        ctx.save();
        ctx.translate(sparkle.x, sparkle.y);
        ctx.rotate(sparkle.rotation); // Usar rotación fija
        ctx.beginPath();
        // Definir las puntas de la estrella
        ctx.moveTo(sparkle.size * Math.cos(0), sparkle.size * Math.sin(0));
        for (let i = 1; i <= 8; i++) {
            const angle = Math.PI / 4 * i;
            const length = i % 2 === 0 ? sparkle.size : sparkle.size * 0.5;
            ctx.lineTo(length * Math.cos(angle), length * Math.sin(angle));
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.5, 0.5 * Math.sin((Math.PI * sparkle.lifetime) / sparkle.maxLifetime))})`;
        ctx.fill();
        ctx.restore();
    }

    // Dibuja y actualiza sparkles
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparkles.forEach((sparkle, index) => {
            sparkle.lifetime -= 16; // decrementar el tiempo de vida en cada frame
            if (sparkle.lifetime <= 0) {
                sparkles[index] = createSparkle(); // reposicionamiento y nuevo ciclo de vida
            } else {
                // Animar la opacidad y dibujar
                sparkle.opacity = Math.min(0.5, 0.5 + 0.5 * Math.sin((Math.PI * sparkle.lifetime) / sparkle.maxLifetime));
                drawSparkle(sparkle);
            }
        });

        requestAnimationFrame(draw);
    };

    draw();
};

window.onload = setupScreen;





