
import { recognize } from "./recognize.js"
import { speak } from "./speak.js"


let init = function () {

  if (!(typeof window !== 'undefined')) {
    return
  }

  recognize()
  speak("Ok, Marte. How are you feeling today?")

}

export { init }