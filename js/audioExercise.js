// Function to play audio
function playAudio(audioId) {
    var audio = document.getElementById(audioId);
    audio.play();
}

// Function to toggle visibility of transcript or translation
function toggleVisibility(elementId) {
    var element = document.getElementById(elementId);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

