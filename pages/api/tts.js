import { render } from 'react-dom'

const AWS = require('aws-sdk')

async function generatePollyAudio(text) {

  const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'eu-central-1'
  })

  let params = {
    'Text': text,
    'OutputFormat': 'mp3',
    'VoiceId': 'Amy',
    'Engine': 'neural'
    // TextType: "ssml",
  }

  return Polly.synthesizeSpeech(params).promise().then(audio => {
    if (audio.AudioStream instanceof Buffer) return audio
    else throw 'AudioStream is not a Buffer.'
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const text = req.body.text
  const audio = await generatePollyAudio(text)

  res.send(audio.AudioStream)
}