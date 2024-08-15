//speakingExercise.js

let mediaRecorder;
let audioChunks = [];

document.getElementById('recordButton').addEventListener('click', startRecording);

function startRecording() {
    console.log('Starting recording...');
    document.getElementById('recordButton').style.display = 'none';
    document.getElementById('recordingStatus').style.display = 'block';

    // Reinicia audioChunks cada vez que inicie una nueva grabación
    audioChunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            console.log('MediaStream obtained, initializing MediaRecorder...');
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            console.log('MediaRecorder started:', mediaRecorder);

            mediaRecorder.addEventListener('dataavailable', event => {
                console.log('Data available:', event.data);
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                console.log('Recording stopped.');
                document.getElementById('submitRecordingButton').style.display = 'block';
                document.getElementById('recordingStatus').style.display = 'none';
            });

            // Asegura que mediaRecorder se detenga después de 5 segundos
            setTimeout(() => {
                if (mediaRecorder.state !== "inactive") {
                    console.log('Stopping MediaRecorder after 5 seconds...');
                    mediaRecorder.stop();
                } else {
                    console.error('MediaRecorder is already inactive.');
                }
            }, 5000); // Graba por 5 segundos
        })
        .catch(error => console.error('Error accessing microphone:', error));
}

function submitRecording() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    
    // Extracción del nivel de competencia y la consigna desde el HTML
    var speakingGuidelines = document.getElementById("speakingGuidelines").textContent;
    var parts = speakingGuidelines.split(":");
    var competenceLevel = parts[0].trim();
    var levelTopic = parts[1].trim();
    
    formData.append('competenceLevel', competenceLevel);
    formData.append('levelTopic', levelTopic);
    
    fetch('/submit-speaking', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            console.log('AI Feedback:', data.response);
            document.getElementById('aiResponse').innerText = data.response;
            document.getElementById('responseMessage').style.display = 'block';
        }
    })
    .catch(error => console.error('Error:', error));
}




