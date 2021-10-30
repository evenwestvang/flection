
let speak = async function (text) {

  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text
    }),
  })

  const buffer = await res.arrayBuffer()
  console.info(buffer.byteLength, "rec mp3 bytes.")

  const context = new AudioContext() || new webkitAudioContext()
  const audioBuffer = await context.decodeAudioData(buffer);
  console.info("decoded audio buffer")

  const bufferSource = context.createBufferSource();
  bufferSource.buffer = audioBuffer;
  bufferSource.connect(context.destination);
  bufferSource.start();
}

export { speak }