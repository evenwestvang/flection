
import { recognize } from "./recognize.js"
import { speak } from "./speak.js"
import { initConversation, respond } from "./conversation.js"

function init(params) {

  initConversation()
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
        onProbableResult(result.transcript)
      }
    }).catch(err => {
      console.info("Speech recognition failed", err)
    })
  }
}



export { init }