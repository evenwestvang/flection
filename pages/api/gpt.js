
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const text = req.body.text
  console.info(text)

  const params = {
    prompt: text,
    max_tokens: 40,
    temperature: 0.90,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 50,
    best_of: 1,
    n: 1,
    stop: '\n'
  }

  const openAIResult = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(params),
  })

  const completion = await openAIResult.json()
  const textReply = { text: completion.choices[0].text }

  res.send(textReply)
}
