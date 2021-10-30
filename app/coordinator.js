
import { recognize } from "./recognize.js"
import { speak } from "./speak.js"


function init() {

  // I can't really imagine this is the idiomatic way to know we're browser side
  if (!(typeof window !== 'undefined')) {
    return
  }

  // speak("Got it")
  recognitionLoop()
}

function recognitionLoop() {
  recognize().then(transcript => {
    console.info(transcript)
    recognitionLoop()
  }).catch(err => {
    console.info("Recognition failed")
    recognitionLoop()
  })
}



export { init }