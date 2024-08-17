// sparky.js

// Function to get the current date in YYYY-MM-DD format
function obtenerFechaActual() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    console.log("Current Date:", formattedDate);
    return formattedDate;
}

// Function to feed Sparky when the feed button is clicked
function alimentarSparky() {
    console.log("Starting alimentarSparky function...");

    const petName = getPetName();
    console.log("Pet Name:", petName);

    const displayName = petName || 'Your Pet';
    console.log("Display Name:", displayName);

    const sparkyGreetingElement = document.getElementById("sparkyGreeting");

    if (sparkyGreetingElement) {
        sparkyGreetingElement.innerHTML = `${displayName} says:<br>${window.dailyMessage}`;
    }

    let sparkyFedCount = parseInt(localStorage.getItem('sparkyFedCount')) || 0;
    console.log("Initial sparkyFedCount:", sparkyFedCount);

    const today = obtenerFechaActual();
    let lastFedDate = localStorage.getItem('lastFedDate');
    console.log("Last Fed Date:", lastFedDate);

    // Si la fecha de la última alimentación es hoy, significa que Sparky ya ha sido alimentado hoy
    if (lastFedDate === today) {
        console.log("Sparky has already been fed today");
        
        const sparkyMessageElement = document.getElementById("sparkyMessage");
        if (sparkyMessageElement) {
            sparkyMessageElement.textContent = `${displayName} has already eaten today! Come back tomorrow.`;
        }

        const sparkyBowlFullElement = document.getElementById("sparkyBowlFull");
        const sparkyBowlEmptyElement = document.getElementById("sparkyBowlEmpty");
        if (sparkyBowlFullElement && sparkyBowlEmptyElement) {
            sparkyBowlFullElement.style.display = "block";
            sparkyBowlEmptyElement.style.display = "none";
        }
    } else {
        console.log("Feeding Sparky...");

        // Incrementar el contador de alimentaciones
        sparkyFedCount++;
        localStorage.setItem('sparkyFedCount', sparkyFedCount);
        localStorage.setItem('lastFedDate', today);

        updateSparkyVisuals(sparkyFedCount, displayName);
    }

    const sparkyFeedCountElement = document.getElementById("sparkyFeedCount");
    if (sparkyFeedCountElement) {
        sparkyFeedCountElement.textContent = `${displayName} has been fed ${sparkyFedCount} times!`;
        console.log("Sparky feed count updated to:", sparkyFedCount);
    }
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

    const sparkyImgElement = document.getElementById("sparkyImg");
    if (sparkyImgElement) {
        sparkyImgElement.src = sparkyImage;
        console.log("Updated Sparky Image:", sparkyImage);
    }

    const sparkyBowlFullElement = document.getElementById("sparkyBowlFull");
    const sparkyBowlEmptyElement = document.getElementById("sparkyBowlEmpty");
    if (sparkyBowlFullElement && sparkyBowlEmptyElement) {
        sparkyBowlFullElement.style.display = "block";
        sparkyBowlEmptyElement.style.display = "none";
    }

    const sparkyMessageElement = document.getElementById("sparkyMessage");
    if (sparkyMessageElement) {
        sparkyMessageElement.textContent = `${displayName} has eaten today! He is getting stronger every day.`;
        console.log("Sparky message updated to: Sparky has eaten today!");
    }
}

// Attach the alimentarSparky function to the button click event
document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded, initializing...");

    const feedButton = document.querySelector('.onClickFeedSparky');
    if (feedButton) {
        feedButton.addEventListener('click', alimentarSparky);
    }

    alimentarSparky(); // Initial check in case the div is already visible on load
});






