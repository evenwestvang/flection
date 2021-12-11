import Head from 'next/head'

import { init } from "../app/coordinator.js"
import { useState } from 'react';
import { PromptList } from "./PromptList.js"


export default function Home() {

  const [active, setActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [prompts, setPrompts] = useState([]);

  function onClick() {
    if (!active) {
      setActive(true)
      if (!(typeof window !== 'undefined')) {
        return
      }
      init({
        setIsListening: setIsListening,
        setIsSpeaking: setIsSpeaking,
        setPrompts: setPrompts
      })
    }
  }


  return (

    <div className="container">
      <div onClick={onClick} className="iphone-x">
        <i>Speaker</i>
        <b>Camera</b>

        <title>What's on your mind</title>

        <main>
          <PromptList prompts={prompts} />

          {isSpeaking || isListening ? <div className="active" /> : <div className="passive" />}
          {/* {isSpeaking || isListening ? "active" : "passive"} */}

        </main>

      </div>


      <style jsx>{`

        .active {
          width: 100%;
          height: 300px;
          background-image: url("/gifs/speaking.gif");
          background-repeat: no-repeat;
          position: absolute;
          background-size:100%;
          mix-blend-mode: lighten;
          bottom: -90px;
        }

        .passive {
          width: 100%;
          height: 300px;
          background-image: url("/gifs/thinking.gif");
          background-repeat: no-repeat;
          position: absolute;
          background-size:100%;
          mix-blend-mode: lighten;
          bottom: -90px;
        }

        h1 {
          font-weight: 100;
          font-size: 3em;
        }

        main {
          z-index: 100;
          padding: 5rem 0;
          font-size: 20px;
        }
        

    `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div >
  )
}
