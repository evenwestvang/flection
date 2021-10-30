

let speak = function (s) {

  fetch('/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: s
    }),
  })
}

export { speak }