import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { missedCalls, plannedCalls, recentCalls } from '../data/mock'
import { useCall } from '../calling/CallContext'
import { IconPhoneMissed, IconPhoneRing } from '../components/Icons'

const PAGE = 2

export function Plan() {
  const loc = useLocation()
  const tab = loc.pathname.includes('incoming') ? 'incoming' : loc.pathname.includes('recent') ? 'recent' : 'calls'
  return (
    <>
      <div className="page-head">
        <div>
          <p>Today’s calling plan</p>
          <h1>Planner</h1>
        </div>
        <div className="muted" style={{ color: 'rgba(255,255,255,0.8)' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}
        </div>
      </div>
      {tab === 'calls' && <CallsToMake />}
      {tab === 'incoming' && <Incoming />}
      {tab === 'recent' && <Recent />}
    </>
  )
}

function CallsToMake() {
  const [page, setPage] = useState(0)
  const [open, setOpen] = useState<string | null>(null)
  const pages = Math.ceil(plannedCalls.length / PAGE)
  const slice = plannedCalls.slice(page * PAGE, page * PAGE + PAGE)
  const call = useCall()

  return (
    <>
      <h3 style={{ margin: '0 0 4px' }}>Planned outgoing calls</h3>
      <p className="muted">Ranked by lead attractiveness score — tap a lead for the full picture</p>
      {slice.map((row) => (
        <div key={row.id}>
          <button className="expand" onClick={() => setOpen(open === row.id ? null : row.id)}>
            <div className="list-row">
              <span className={`dot-avatar ${row.score >= 90 ? 'a-amber' : 'a-mint'}`}>{row.initials}</span>
              <div className="meta">
                <b>{row.name}</b>
                <p>Interested: {row.interest} · ₹{row.amount.toLocaleString('en-IN')}</p>
              </div>
              <div className="score">{row.score}<small>SCORE</small></div>
            </div>
          </button>
          {open === row.id && (
            <div className="detail">
              {row.notes} · {row.lastTouch} · {row.phone}
              <div>
                <button className="btn-call" onClick={() => call.setOpenDialer(true)}>
                  Call human
                </button>
                {' '}
                <button className="btn-call" onClick={() => void call.startAiCall(`${row.name} · AI shopper`)}>
                  AI shopper
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="pager">
        <button onClick={() => setPage((p) => Math.max(0, p - 1))}>‹</button>
        Page {page + 1} of {pages}
        <button onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}>›</button>
      </div>
    </>
  )
}

function Incoming() {
  const call = useCall()
  const value = missedCalls.reduce((s, m) => s + (m.expected || 0), 0)
  return (
    <>
      <h3 style={{ margin: '0 0 4px' }}>Missed calls</h3>
      <p className="muted">Ranked by expected value — call the highest-value leads back first</p>
      <div className="stat-row">
        <div><b>{missedCalls.length}</b><span>MISSED TODAY</span></div>
        <div><b>₹{value.toLocaleString('en-IN')}</b><span>EXPECTED VALUE AT STAKE</span></div>
      </div>
      {missedCalls.map((m) => (
        <div className="list-row" key={m.id}>
          <span className="dot-avatar a-rose"><IconPhoneMissed size={14} color="#be123c" /></span>
          <div className="meta">
            <b>{m.name}</b>
            <p>{m.when} · {m.tag}</p>
          </div>
          <div className="row-actions">
            <span className="money">{m.expected ? `₹${m.expected.toLocaleString('en-IN')} expected` : 'New contact'}</span>
            <button
              className="btn-call"
              onClick={() => {
                call.setOpenDialer(true)
                void call.startAiCall(`${m.name} · callback`)
              }}
            >
              Call back
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

function Recent() {
  const [id, setId] = useState<string | null>(null)
  const selected = useMemo(() => recentCalls.find((c) => c.id === id), [id])
  return (
    <>
      <h3 style={{ margin: '0 0 4px' }}>Recent calls</h3>
      <p className="muted">Tap a call to review it against SOP</p>
      {recentCalls.map((c) => (
        <button key={c.id} className="expand" onClick={() => setId(c.id)}>
          <div className="list-row">
            <span className={`dot-avatar ${c.direction === 'missed' ? 'a-rose' : 'a-mint'}`}>
              {c.direction === 'missed' ? <IconPhoneMissed size={14} color="#be123c" /> : <IconPhoneRing size={14} color="#047857" />}
            </span>
            <div className="meta">
              <b>{c.name}</b>
              <p>{c.when} · {c.duration}</p>
            </div>
          </div>
        </button>
      ))}
      {selected && (
        <div className="card sop">
          <b>SOP review · {selected.name}</b>
          <ul>
            {selected.sop.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      )}
    </>
  )
}
