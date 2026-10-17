import { useRef, useState } from 'react'
import { practiceScript } from '../data/mock'
import { useCall } from '../calling/CallContext'

type Line = { who: 'shopper' | 'you' | 'hint'; text: string }

function speak(text: string) {
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.rate = 1
  window.speechSynthesis.speak(u)
}

export function Practice() {
  const call = useCall()
  const [lines, setLines] = useState<Line[]>([])
  const [step, setStep] = useState(0)
  const [listening, setListening] = useState(false)
  const recRef = useRef<SpeechRecognition | null>(null)

  function nextShopper() {
    const item = practiceScript[step]
    if (!item) {
      setLines((l) => [...l, { who: 'hint', text: 'Practice complete. Log an outcome and book the callback.' }])
      return
    }
    if (item.who === 'shopper') {
      setLines((l) => [...l, item])
      speak(item.text)
      setStep((s) => s + 1)
    } else {
      setLines((l) => [...l, item])
      setStep((s) => s + 1)
      const following = practiceScript[step + 1]
      if (following?.who === 'shopper') {
        window.setTimeout(() => {
          setLines((l) => [...l, following])
          speak(following.text)
          setStep((s) => s + 1)
        }, 900)
      }
    }
  }

  function listen() {
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!Ctor) {
      setLines((l) => [...l, { who: 'hint', text: 'Speech recognition is not available in this browser. Use Chrome and allow the mic.' }])
      return
    }
    const rec = new Ctor()
    rec.lang = 'en-IN'
    rec.continuous = false
    rec.interimResults = false
    rec.onresult = (ev) => {
      const text = ev.results[0][0].transcript
      setLines((l) => [...l, { who: 'you', text }])
      window.setTimeout(nextShopper, 500)
    }
    rec.onend = () => setListening(false)
    recRef.current = rec
    setListening(true)
    rec.start()
  }

  return (
    <>
      <div className="page-head">
        <div>
          <p>Coaching</p>
          <h1>Practise a call</h1>
        </div>
      </div>
      <div className="practice">
        <p className="muted">
          AI-to-human: the shopper speaks with the Web Speech API (TTS). You answer with the microphone (STT).
          This is a real voice loop in Chrome — not a filmed mock.
        </p>
        <div className="call-actions">
          <button className="btn-primary" onClick={() => { setLines([]); setStep(0); window.setTimeout(nextShopper, 200) }}>
            Start script
          </button>
          <button className="btn-ghost" disabled={listening} onClick={listen}>
            {listening ? 'Listening…' : 'Speak your turn'}
          </button>
          <button className="btn-ghost" onClick={() => void call.startAiCall('Practice shopper · AI')}>
            Live AI call
          </button>
        </div>
        <div className="transcript">
          {lines.length === 0 && <p className="muted">Start the script, then speak after each shopper line.</p>}
          {lines.map((l, i) => (
            <div key={i} className={`line ${l.who}`}><b>{l.who}:</b> {l.text}</div>
          ))}
        </div>
      </div>
    </>
  )
}
