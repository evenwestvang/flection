
import { recognize } from "./recognize.js"
import { initSpeaker, speak } from "./speak.js"
import { initConversation, respond } from "./conversation.js"
import uuid from 'uuid';

let setPrompts

function init(params) {
  initSpeaker(params)
  initConversation()
  setPrompts = params.setPrompts
  recognitionLoop(params, (userStatemnt) => {
    respond(userStatemnt)
  })
}

function beConfused() {
  const repeatStatements = [
    "I didn't quite catch that. Could you repeat it.",
    "Come again?",
    "Apologies, could you repeat that?"
  ]
  const comeAgain = repeatStatements[Math.floor(Math.random() * repeatStatements.length)]
  speak(comeAgain)
}

async function recognitionLoop(params, onProbableResult) {

  while (true) {
    await recognize(params.setIsListening).then(result => {
      if (result.confidence < 0.80) {
        beConfused()
      } else {
        const transcript = result.transcript.charAt(0).toUpperCase() + result.transcript.slice(1)
        onProbableResult(transcript)
        setPrompts([{ id: uuid(), text: transcript }])

      }
    }).catch(err => {
      console.info("Speech recognition failed", err)
    })
  }
}



export { init }