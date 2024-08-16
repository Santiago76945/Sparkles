// sparky.js

// Function to check if lessonCompleted div is visible
function isLessonCompletedVisible() {
    const lessonCompletedDiv = document.querySelector('.lessonCompleted');
    const isVisible = lessonCompletedDiv && lessonCompletedDiv.offsetParent !== null;
    console.log("isLessonCompletedVisible:", isVisible);
    return isVisible;
}

// Function to get the current date in YYYY-MM-DD format
function obtenerFechaActual() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    console.log("Current Date:", formattedDate);
    return formattedDate;
}

// Function to feed Sparky if a lesson was completed today
function alimentarSparky() {
    console.log("Starting alimentarSparky function...");

    const petName = getPetName(); 
    console.log("Pet Name:", petName);

    const displayName = petName || 'Your Pet';
    console.log("Display Name:", displayName);

    document.getElementById("sparkyGreeting").innerHTML = `${displayName} says:<br>${window.dailyMessage}`;

    let sparkyFedCount = parseInt(localStorage.getItem('sparkyFedCount')) || 0;
    console.log("Initial sparkyFedCount:", sparkyFedCount);

    const today = obtenerFechaActual();
    let lastFedDate = localStorage.getItem('lastFedDate');
    console.log("Last Fed Date:", lastFedDate);

    // Si la fecha de la última alimentación es hoy, significa que Sparky ya ha sido alimentado hoy
    if (lastFedDate === today) {
        console.log("Sparky has already been fed today");
        document.getElementById("sparkyMessage").textContent = `${displayName} has already eaten today! Come back tomorrow.`;

        // Mostrar el bowl lleno
        document.getElementById("sparkyBowlFull").style.display = "block";
        document.getElementById("sparkyBowlEmpty").style.display = "none";
    } 
    // Si el div lessonCompleted es visible y Sparky no ha sido alimentado hoy
    else if (isLessonCompletedVisible()) {
        console.log("Feeding Sparky for the first time today...");

        // Incrementar el contador de alimentaciones
        sparkyFedCount++;
        localStorage.setItem('sparkyFedCount', sparkyFedCount);
        localStorage.setItem('lastFedDate', today);

        updateSparkyVisuals(sparkyFedCount, displayName);
    } 
    // Si la lección no se ha completado, mostrar el mensaje correspondiente
    else {
        console.log("Lesson not completed today, Sparky won't be fed");
        document.getElementById("sparkyMessage").textContent = `${displayName} didn’t eat today! Complete a lesson to feed him.`;

        // Mostrar el bowl vacío
        document.getElementById("sparkyBowlFull").style.display = "none";
        document.getElementById("sparkyBowlEmpty").style.display = "block";
    }

    document.getElementById("sparkyFeedCount").textContent = `${displayName} has been fed ${sparkyFedCount} times!`;
    console.log("Sparky feed count updated to:", sparkyFedCount);
}

function updateSparkyVisuals(sparkyFedCount, displayName) {
    // Actualizar la imagen de Sparky según la cantidad de veces alimentado
    let sparkyImage = "/images/Sparky/sparkyAge1.png";
    if (sparkyFedCount >= 365) {
        sparkyImage = "/images/Sparky/sparkyAge5.png";
    } else if (sparkyFedCount >= 180) {
        sparkyImage = "/images/Sparky/sparkyAge4.png";
    } else if (sparkyFedCount >= 90) {
        sparkyImage = "/images/Sparky/sparkyAge3.png";
    } else if (sparkyFedCount >= 7) {
        sparkyImage = "/images/Sparky/sparkyAge2.png";
    }
    document.getElementById("sparkyImg").src = sparkyImage;
    console.log("Updated Sparky Image:", sparkyImage);

    // Mostrar el bowl lleno
    document.getElementById("sparkyBowlFull").style.display = "block";
    document.getElementById("sparkyBowlEmpty").style.display = "none";

    document.getElementById("sparkyMessage").textContent = `${displayName} has eaten today! He is getting stronger every day.`;
    console.log("Sparky message updated to: Sparky has eaten today!");
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded, initializing...");
    alimentarSparky(); // Initial check in case the div is already visible on load
});






