//writingExercise.js

function submitWriting() {
    var textArea = document.getElementById("studentWriting");
    var text = textArea.value.trim();
    var wordCount = text.split(/\s+/).length;

    if (wordCount < 10 || wordCount > 20) {
        document.getElementById("errorMessage").style.display = "block";
        document.getElementById("responseMessage").style.display = "none";
    } else {
        document.getElementById("errorMessage").style.display = "none";
        
        // Reasignar la clase al botón para asegurar que el estilo se mantenga
        var submitButton = document.querySelector("button.defaultButton");
        submitButton.classList.add("defaultButton");

        // Extracción del nivel de competencia y el tema
        var activityGuidelines = document.getElementById("activityGuidelines").textContent;
        var parts = activityGuidelines.split(":");
        var competenceLevel = parts[0].trim();
        var levelTopic = parts[1].trim();

        // Envío de datos al servidor
        fetch('/submit-writing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                competenceLevel: competenceLevel,
                levelTopic: levelTopic,
                studentText: text
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server Response:", data);
            if (data.error) {
                document.getElementById("iaResponse").textContent = `Error: ${data.error}`;
            } else {
                document.getElementById("responseMessage").style.display = "block";
                document.getElementById("iaResponse").textContent = `${data.response}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("iaResponse").textContent = `An error occurred: ${error.message}`;
        });
    }
}


