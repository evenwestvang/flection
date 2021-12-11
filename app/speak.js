


let setIsSpeaking, setPrompts, prompts
import uuid from 'uuid';


function initSpeaker(params) {
  console.info(params)
  setIsSpeaking = params.setIsSpeaking
  setPrompts = params.setPrompts
}

async function speak(text) {

  if (text == undefined || text == '') {
    return
  }

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
  const audioBuffer = await context.decodeAudioData(buffer)
  console.info("decoded audio buffer")

  setPrompts(p => [...p, { id: uuid(), text }])

  const bufferSource = context.createBufferSource()
  bufferSource.buffer = audioBuffer
  bufferSource.connect(context.destination)
  bufferSource.start()
  setIsSpeaking(true)
  console.info("Sound started")

  bufferSource.onended = function () {
    console.info("Sound ended")
    setIsSpeaking(false)
  }

}

export { speak, initSpeaker }