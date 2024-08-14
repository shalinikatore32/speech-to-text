from flask import Flask, request, jsonify
from googletrans import Translator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

translator = Translator()

@app.route('/api/submit', methods=['POST'])
def submit_transcript():
    data = request.json
    transcript = data.get('transcript', '')
    target_lang = data.get('targetLang', 'en')  # Default to English if no target language provided
    
    # Translate the transcript
    try:
        translation = translator.translate(transcript, dest=target_lang).text
        return jsonify({'status': 'success', 'translation': translation}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
