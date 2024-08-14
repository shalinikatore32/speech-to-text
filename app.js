document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const transcriptArea = document.getElementById('transcript');
    const targetLangSelect = document.getElementById('targetLang');

    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
                                .map(result => result[0])
                                .map(result => result.transcript)
                                .join('');
        transcriptArea.value = transcript;
        
        // Get selected target language
        const targetLang = targetLangSelect.value;

        // Send transcript and target language to Flask backend
        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ transcript, targetLang })
        })
        .then(response => response.json())
        .then(data => {
            // Display the translated text (optional)
            transcriptArea.value = `Translated: ${data.translation}`;
        });
    };

    startButton.addEventListener('click', () => {
        recognition.start();
    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
    });
});
