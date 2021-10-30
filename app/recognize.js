
function recognize() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition || null;

  var recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function (event) {
    var res = event.results[0][0].transcript;
    console.info(res);
  }
}

export { recognize }