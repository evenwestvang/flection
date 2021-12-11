import Head from 'next/head'


import { init } from "../app/coordinator.js"
import { useState } from 'react';

export default function Home() {

  const [active, setActive] = useState(false);
  const [isListening, setIsListening] = useState(false);

  function onClick() {
    if (!active) {
      setActive(true)
      if (!(typeof window !== 'undefined')) {
        return
      }
      init({
        setIsListening: setIsListening
      })
    }
  }

  return (

    <div className="container">
      <div className="iphone-x">
        <i>Speaker</i>
        <b>Camera</b>

        <title>What's on your mind</title>

        <main>
          <h1 className="title" onClick={onClick}>
            {active ? "Your coach is in session" : "Start session"}
          </h1>
          {isListening ? "i'm listening" : "i'm not listening"}
        </main>

      </div>


      <style jsx>{`


        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
