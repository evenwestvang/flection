
function recognize(setIsListening) {

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition || null;

  return new Promise((resolve, reject) => {

    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onsoundstart = even => {
      setIsListening(true)
    }

    recognition.onsoundend = even => {
      setIsListening(false)
    }

    recognition.onnomatch = recognition.onend = recognition.onresult = event => {
      reject(event)
    }

    recognition.onresult = event => {
      const res = event.results[0]
      const alt = res[0]
      if (res.isFinal) {
        resolve({ transcript: alt.transcript, confidence: alt.confidence })
      } else {
        console.info("Intermediate result:" + alt.transcript);
      }
    }
  })
}

export { recognize }