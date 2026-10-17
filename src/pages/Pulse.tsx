import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconHeadset, IconBarChart, IconClipboard, IconTarget, IconMic, IconSmiley } from '../components/Icons'

export function Pulse() {
  const nav = useNavigate()
  const [brief, setBrief] = useState(false)
  const [q, setQ] = useState('')
  const [answer, setAnswer] = useState('')

  return (
    <>
      <div className="pulse-head">Pulse <span>The Sleep Company · Koramangala</span></div>
      <input
        className="search"
        placeholder="Ask AvaniBot or search Pulse…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setAnswer(q ? `AvaniBot: I logged "${q}". Highest-value missed call is Faizan A. (₹24,990).` : '')
          }
        }}
      />
      <div className="avani">
        <h3>AvaniBot <small>ALWAYS ON</small></h3>
        <p>Ask me about anything happening in Pulse — daily briefs, action items, quick answers</p>
        <div className="avani-actions">
          <button onClick={() => setBrief(true)}>✦ Daily Brief</button>
          <button onClick={() => setAnswer('Greeting-in-first-10s is 71% this week. Open every call with the script.')}>◯ Ask a question</button>
        </div>
        <div style={{ marginTop: 6 }}><span className="badge-count">2</span></div>
      </div>
      {brief && (
        <div className="brief">
          <b>Daily brief</b>
          <p>5 missed calls, ₹81,860 at stake. Two hot leads untouched 24h. Coaching at 4:30pm with Priya Iyer callback.</p>
        </div>
      )}
      {answer && <div className="brief">{answer}</div>}
      <p className="muted">Custom Agents · Set up by your manager — already live, tap to open</p>

      <div className="section-label green">ROLE AGENTS <small>run a team</small></div>
      <button className="agent-row border-green" onClick={() => nav('/pulse/callcentre-team')}>
        <span className="agent-type-icon role"><IconHeadset size={16} /></span>
        <div className="meta"><b># callcentre-agent</b><p>Call Centre Agent</p></div>
      </button>

      <div className="section-label purple">TASK AGENTS <small>move one metric</small></div>
      {[
        { name: '# cross-sell-agent', sub: 'Your Attach rate · 5 members', pct: '24%', cls: 'bad', border: 'border-purple', iconCls: 'task-cross', icon: <IconBarChart size={16} /> },
        { name: '# sop-agent', sub: 'Your SOP adherence · 5 members', pct: '81%', cls: 'ok', border: 'border-purple', iconCls: 'task-sop', icon: <IconClipboard size={16} /> },
        { name: '# lead-conversion-agent', sub: 'Lead Conversion Agent', pct: '', cls: '', border: 'border-red', iconCls: 'task-lead', icon: <IconTarget size={16} /> },
        { name: '# capture-agent', sub: 'Your Capture coverage · 5 members', pct: '78%', cls: 'ok', border: 'border-orange', iconCls: 'task-capture', icon: <IconMic size={16} /> },
      ].map((a) => (
        <button key={a.name} className={`agent-row ${a.border}`} onClick={() => nav('/pulse/callcentre-team')}>
          <span className={`agent-type-icon ${a.iconCls}`}>{a.icon}</span>
          <div className="meta"><b>{a.name}</b><p>{a.sub}</p></div>
          {a.pct && <span className={`pct ${a.cls}`}>{a.pct}</span>}
          <span className="msg-badge"><IconSmiley size={16} color="#9ca3af" /></span>
        </button>
      ))}

      <p className="muted" style={{ marginTop: 14 }}>GENERAL</p>
      <button className="agent-row border-teal" onClick={() => nav('/pulse/callcentre-team')}>
        <span className="agent-type-icon general">💬</span>
        <div className="meta"><b>customer-discussions</b><p>Relayed via WhatsApp Business</p></div>
      </button>

      <div className="kudos">
        <b>Kudos <span className="badge-count" style={{ background: '#7c2d12', marginLeft: 6 }}>3 NEW</span></b>
        <p>"Great work with Mukunda — closed that objection beautifully." — Sunita Rao</p>
      </div>

      <p className="muted" style={{ marginTop: 14 }}>CHANNELS</p>
    </>
  )
}
