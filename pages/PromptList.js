

export function PromptList(params) {
  const prompts = params.prompts

  return (
    <ul className="promptList">
      {prompts.map((p) => { return prompt(p) })}
    </ul>
  )
}


function prompt(p) {
  return <li>{p}</li>
}