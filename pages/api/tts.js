
const AWS = require('aws-sdk')


async function callAWSPolly(text) {
  const Fs = require('fs')
  console.info("calling polly with", text)

  // Create an Polly client
  const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
  })

  let params = {
    'Text': text,
    'OutputFormat': 'mp3',
    'VoiceId': 'Matthew',
    'Engine': 'neural'
    // TextType: "ssml",
  }

  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log(err.code)
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        Fs.writeFile("./speech.mp3", data.AudioStream, function (err) {
          if (err) {
            return console.log(err)
          }
          console.log("The file was saved!")
        })
      }
    }
  })

}


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }


  const text = req.body.text
  const stream = await callAWSPolly(text)

  // the rest of your code
}
