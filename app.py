#app.py

import io
from flask import Flask, send_from_directory, request, jsonify
import openai

app = Flask(__name__)

# Configura tu clave de API de OpenAI
openai.api_key = "tu_clave_de_api_aqui"

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/lesson6')
def lesson6():
    return send_from_directory('pages/spanishFromEnglish/A1lessons', 'ESPfromENG-A1-Lev1-Lecc6.html')

@app.route('/lesson7')
def lesson7():
    return send_from_directory('pages/spanishFromEnglish/A1lessons', 'ESPfromENG-A1-Lev1-Lecc7.html')

# Rutas para servir archivos estáticos
@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('css', filename)

@app.route('/fonts/<path:filename>')
def serve_fonts(filename):
    return send_from_directory('fonts', filename)

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('images', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('js', filename)

@app.route('/music/<path:filename>')
def serve_music(filename):
    return send_from_directory('music', filename)

# Endpoint para el ejercicio de escritura
@app.route('/submit-writing', methods=['POST'])
def submit_writing():
    data = request.json
    
    competenceLevel = data.get('competenceLevel')
    levelTopic = data.get('levelTopic')
    studentText = data.get('studentText')
    
    if not competenceLevel or not levelTopic or not studentText:
        return jsonify({'error': 'Missing data in request'}), 400
    
    # Construimos el prompt para la IA
    full_prompt = (
        f"You're assisting an English-speaking student who is learning Spanish at a {competenceLevel} level. "
        f"The student has been practicing the topic '{levelTopic}' and has written the following text: \n\n"
        f"\"{studentText}\"\n\n"
        "Provide detailed feedback on the text, including any errors and suggestions for improvement. "
        "Also, give a qualitative grade (bad, regular, good, excellent, perfect) based on the student's competence level."
    )
    
    # Genera una respuesta utilizando GPT-3.5 Turbo
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert language instructor."},
                {"role": "user", "content": full_prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        # Procesa la respuesta para extraer el contenido
        generated_text = response['choices'][0]['message']['content'].strip()
        print(f"Generated Text: {generated_text}")  # Depuración
        
    except Exception as e:
        print(f"Error generating response: {e}")
        return jsonify({'error': 'Failed to generate feedback.'}), 500
    
    # Envía la respuesta de la IA de vuelta al cliente en un solo string
    return jsonify({'response': generated_text})

# Endpoint para el ejercicio de speaking
@app.route('/submit-speaking', methods=['POST'])
def submit_speaking():
    if 'audio' not in request.files or 'competenceLevel' not in request.form or 'levelTopic' not in request.form:
        return jsonify({'error': 'Missing data in request'}), 400
    
    audio_file = request.files['audio']
    competenceLevel = request.form['competenceLevel']
    levelTopic = request.form['levelTopic']
    
    try:
        # Procesar el audio para obtener la transcripción
        audio_data = io.BytesIO(audio_file.read())
        audio_data.name = audio_file.filename

        response = openai.Audio.transcribe("whisper-1", audio_data, language="es")
        transcript = response['text']
        
        # Construir el prompt para la IA con la transcripción y la consigna
        full_prompt = (
            f"You're assisting a student who is learning Spanish at a {competenceLevel} level. "
            f"The student has been practicing the topic '{levelTopic}' and recorded the following: \n\n"
            f"\"{transcript}\"\n\n"
            "Provide detailed feedback on the correctness of the vocabulary, grammar, and formality of the introduction. "
            "Also, give a qualitative assessment (bad, regular, good, excellent, perfect) based on the student's competence level."
        )
        
        ai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert language instructor."},
                {"role": "user", "content": full_prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        generated_text = ai_response['choices'][0]['message']['content'].strip()
        print(f"Generated Feedback: {generated_text}")
        
    except openai.error.OpenAIError as e:
        print(f"OpenAI API error: {e}")
        return jsonify({'error': 'Failed to transcribe the audio. Please try again later.'}), 500
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'An unexpected error occurred.'}), 500
    
    return jsonify({'response': generated_text})


if __name__ == '__main__':
    app.run(debug=True)


