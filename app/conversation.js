
import { speak } from './speak.js'

// import * from './episodes/intro.js'

// setting: `Joanna is a positive CBT coach. She is very good at asking questions on typical everyday reflections, and wait for an answer. The goal of the dialogue is to get Jane to grapple with her issues and feel empowered.
// The following is a dialogue between Joanna and a twelve year old girl, called Jane.`,

const dialogueParamsStart = {
  setting: `Joanna is a life coach for teenage girls. Joanna has a dialogue session with her client, Jane. Joanna asks a question and then waits for an answer. Joanna only asks her very typical journal reflection questions, like: how are you feeling right now: can you manage to think about one good thing that has happened today: can you think of one more good thing that has happened today: can you think of one last good thing that has happened today: how did this make you feel: now I'd like you to think about one thing that was difficult or challenging today: how did that make you feel?  Joanna is friendly and humorous. The goal of the session is to increase Jane's self-confidence.`,
  opening: `Hello Jane. How was your day?`,
  userName: `Jane`,
  computerName: 'Joanna'
}

const dialogueParamsEnd = {
  setting: `Joanna the life coach is winding down a session with her client. This is a transcript.`,
  opening: `Great job. Any final reflections?`,
  userName: `Jane`,
  computerName: 'Joanna'
}

const dialogueParams = dialogueParamsStart

const dialogue = []

function initConversation() {
  speak(dialogueParams.opening)
  dialogue.push({ speaker: 'computer', text: dialogueParams.opening })
}

function respond(userReply) {

  console.info(`User: ${userReply}`)
  dialogue.push({ speaker: 'user', text: userReply })
  const prompt = buildPrompt()
  console.info("*Prompt*\n\n", prompt)
  generateReply(prompt).then((computerResponse) => {
    console.info(`Computer:${computerResponse}`)
    dialogue.push({ speaker: 'computer', text: computerResponse })
    speak(computerResponse)
  })
}

function buildPrompt() {
  const lines = dialogue.map(line => {
    const charName = line.speaker == 'computer' ? dialogueParams.computerName : dialogueParams.userName
    return `${charName}:${line.text}\n`
  })
  return dialogueParams.setting + '\n\n' + lines.join('') + `${dialogueParams.computerName}:`
}

async function generateReply(text) {
  const res = await fetch('/api/gpt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text
    }),
  })

  const completion = await res.json()
  return completion.text
}


export { respond, initConversation }