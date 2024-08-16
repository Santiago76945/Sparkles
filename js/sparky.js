// sparky.js

// Function to check if lessonCompleted div is visible
function isLessonCompletedVisible() {
    const lessonCompletedDiv = document.querySelector('.lessonCompleted');
    return lessonCompletedDiv && lessonCompletedDiv.offsetParent !== null;
}

// Function to get the current date in YYYY-MM-DD format
function obtenerFechaActual() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Function to feed Sparky if a lesson was completed today
function alimentarSparky() {
    const petName = getPetName(); // Get the pet's name from localStorage
    const displayName = petName || 'Your Pet'; // Default name if not set

    // Replace [petName] placeholders in the HTML with the daily message
    document.getElementById("sparkyGreeting").innerHTML = `${displayName} says:<br>${window.dailyMessage}`;

    let sparkyFedCount = parseInt(localStorage.getItem('sparkyFedCount')) || 0;
    const today = obtenerFechaActual();

    let lastFedDate = localStorage.getItem('lastFedDate');

    // Check if the lessonCompleted div is visible
    if (isLessonCompletedVisible()) {
        // Check if Sparky has been fed today
        if (lastFedDate !== today) {
            // Feed Sparky for the first time today
            sparkyFedCount++;
            localStorage.setItem('sparkyFedCount', sparkyFedCount);
            localStorage.setItem('lastFedDate', today);

            // Update Sparky's image based on the number of times fed
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

            // Show the full bowl and hide the empty bowl
            document.getElementById("sparkyBowlFull").style.display = "block";
            document.getElementById("sparkyBowlEmpty").style.display = "none";

            document.getElementById("sparkyMessage").textContent = `${displayName} has eaten today! He is getting stronger every day.`;
            console.log("Sparky has been fed!");
        } else {
            // Sparky has already been fed today
            document.getElementById("sparkyMessage").textContent = `${displayName} has already eaten today! Come back tomorrow.`;

            // Show the full bowl and hide the empty bowl
            document.getElementById("sparkyBowlFull").style.display = "block";
            document.getElementById("sparkyBowlEmpty").style.display = "none";
        }
    } else {
        // Lesson not completed today
        document.getElementById("sparkyMessage").textContent = `${displayName} didn’t eat today! Complete a lesson to feed him.`;

        // Show the empty bowl and hide the full bowl
        document.getElementById("sparkyBowlFull").style.display = "none";
        document.getElementById("sparkyBowlEmpty").style.display = "block";
    }

    // Update the feed count
    document.getElementById("sparkyFeedCount").textContent = `${displayName} has been fed ${sparkyFedCount} times!`;
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', alimentarSparky);

