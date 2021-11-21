
import { speak } from './speak.js'

// import * from './episodes/intro.js'

// setting: `Brian is a positive CBT coach. He is very good at asking structured questions that get patients to grapple with their issues and feel empowered.
// The following is a dialogue between Brian and a young girl that needs is back at school and needs to raise her self esteem: a 12 year old girl who has had remote schooling for a year during covid and is struggling getting used to be around people again.`,

const patientName = "Jane"

const dialogueParams = {
  setting: `Brian is a life coach for tweens. He is very good at raising young girl's self-esteem by asking them to reflect around everyday occurences. The goal of of the reflection is to raise the person's self-esteem. 
The following is a dialogue between Brian and a a twelve year old girl. The girl has had remote schooling for a year beacuse of covid, and after school started a few months ago, she finds it hard to be around other people. Brian only asks her very typical journal reflection questions, like: what's making your day ok, can you manage to think about one good thing that has happened today, can you think of one more good thing that has happened today, can you think of one last good thing that has happened today, and how did this make you feel, followed by now I'd like you to think about one thing that was difficult or challenging today, how did that make you feel? `,
  opening: `Hello ${patientName}. How are you feeling today?`,
  userName: `${patientName}`,
  computerName: 'Brian'
}

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