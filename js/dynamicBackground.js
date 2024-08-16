// dynamicBackground.js

const createBokehBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1'; // Detrás del contenido
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const bokehCircles = [];
    const numCircles = 50;

    // Crear círculos de bokeh inicialmente
    for (let i = 0; i < numCircles; i++) {
        bokehCircles.push(createCircle());
    }

    // Función para crear un círculo de bokeh
    function createCircle() {
        const radius = Math.random() * 170 + 30;  // Radio entre 30 y 200
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: radius,
            dx: (Math.random() - 0.5) * 0.1,  // Movimiento en x, 5 veces más lento
            dy: (Math.random() - 0.5) * 0.1,  // Movimiento en y, 5 veces más lento
            color: `rgba(255, 255, 255, 0.2)`, // Color blanco con opacidad fija al 20%
        };
    }

    // Función para dibujar un círculo de bokeh
    function drawCircle(circle) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = circle.color; // Usamos el color con opacidad fija
        ctx.fill();
    }

    // Animación del bokeh
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bokehCircles.forEach(circle => {
            circle.x += circle.dx;
            circle.y += circle.dy;

            // Rebote en los bordes
            if (circle.x < 0 || circle.x > canvas.width) circle.dx *= -1;
            if (circle.y < 0 || circle.y > canvas.height) circle.dy *= -1;

            drawCircle(circle);
        });

        requestAnimationFrame(animate);
    };

    animate();

    // Redimensionar el canvas cuando la ventana cambia de tamaño
    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
};

window.addEventListener('load', createBokehBackground);

