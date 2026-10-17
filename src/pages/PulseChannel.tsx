import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { initialChannelMessages, type ChatMsg } from '../data/mock'

export function PulseChannel() {
  const nav = useNavigate()
  const [messages, setMessages] = useState<ChatMsg[]>(initialChannelMessages)
  const [pinReply, setPinReply] = useState('')
  const [pinDone, setPinDone] = useState<'Confirmed' | 'Reschedule' | ''>('')
  const [draft, setDraft] = useState('')

  function send(text: string, fromPin = false) {
    const t = text.trim()
    if (!t) return
    const msg: ChatMsg = {
      id: crypto.randomUUID(),
      from: 'me',
      author: 'You',
      time: new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }),
      text: t,
    }
    setMessages((m) => [...m, msg])
    if (fromPin) setPinReply('')
    else setDraft('')
  }

  return (
    <>
      <div className="channel-head">
        <button className="btn-ghost" style={{ color: '#fff', background: 'transparent', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => nav('/pulse')}>←</button>
        #callcentre-team
      </div>
      {!pinDone && (
        <div className="pin">
          <div className="pin-badge">📌 Needs your input <span className="badge-count">1</span> <span style={{ fontWeight: 400, color: '#6b7285' }}>pinned</span></div>
          <h3>Confirm the 4:30pm callback</h3>
          <p className="muted">Priya Iyer · likely billing dispute</p>
          <div className="pin-actions">
            {['Confirmed', 'Reschedule'].map((b) => (
              <button
                key={b}
                className="btn-ghost"
                onClick={() => {
                  setPinDone(b as 'Confirmed' | 'Reschedule')
                  send(`${b} the 4:30pm callback with Priya Iyer.`, true)
                }}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="reply-row">
            <input
              placeholder="Or type your answer"
              value={pinReply}
              onChange={(e) => setPinReply(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(pinReply, true)}
            />
            <button className="send" onClick={() => send(pinReply, true)}>Send</button>
          </div>
        </div>
      )}
      {pinDone && <div className="brief">You answered: {pinDone}</div>}
      <div className="dayline">Today · Call Centre Team</div>
      {messages.map((m) => {
        const initials = m.author === 'You' ? 'AR' : m.author.split(' ').map(p => p[0]).join('')
        const avatarClass = m.from === 'me' ? 'a-mint' : 'a-lilac'
        return (
          <div key={m.id} className={`chat-row ${m.from === 'me' ? 'right' : ''}`}>
            <span className={`chat-avatar ${avatarClass}`}>{initials}</span>
            <div>
              <div className="who" style={{ textAlign: m.from === 'me' ? 'right' : 'left' }}>
                {m.author} {m.time}
              </div>
              <div className={`bubble ${m.from === 'me' ? 'me' : ''}`}>{m.text}</div>
            </div>
          </div>
        )
      })}
      <div className="composer">
        <input
          placeholder="Message #callcentre-team…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(draft)}
        />
        <button className="send" onClick={() => send(draft)}>Send</button>
        <button className="icon-btn" style={{ background: 'transparent', color: '#9ca3af', border: 0 }} aria-label="Emoji">😊</button>
      </div>
    </>
  )
}
