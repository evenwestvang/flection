
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';


export function PromptList(params) {
  const prompts = params.prompts

  return (
    <div>
      <TransitionGroup className="promptList">
        {prompts.map((p) =>

          <CSSTransition
            key={p.id}
            timeout={3000}
            classNames="prompt"
          >
            <div className="prompt">
              {p.text}
            </div>
          </CSSTransition>


        )}
      </TransitionGroup>


      <style jsx global>{`
      .promptList {
        margin: 100px 20px 0px 20px;
        
      }

      .prompt {
          width: 100%;
          position: relative;
          margin-bottom: 30px;
          opacity: 0.8;
          mix-blend-mode: hard-light;
          line-height: 1.4;
        }

        .prompt-enter {
          height: 0%;
          top: -20px;
          opacity: 0;
        }

        .prompt-enter-active {
          height: 100%;
          top: 0px;
          opacity: 1;
          transition: all 3000ms ease-in;
        }

        .prompt-exit {
          opacity: 1;
        }

        .prompt-exit-active {
          opacity: 0;
          transition: all 10ms ease-in;
        }

      `}</style>
    </div >
  )
}

