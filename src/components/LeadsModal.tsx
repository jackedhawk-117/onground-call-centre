import { useState } from 'react'
import { leads } from '../data/mock'
import { useCall } from '../calling/CallContext'

export function LeadsModal({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0)
  const [open, setOpen] = useState({ icp: false, how: false, signals: true })
  const lead = leads[i]
  const call = useCall()

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-h">
          <div>
            <strong>Leads</strong>
            <div style={{ fontSize: 12, opacity: 0.85 }}>Lead {i + 1} of {leads.length} · SLA to close</div>
          </div>
          <button className="close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-b">
          <div className="dots">
            {leads.map((_, idx) => <i key={idx} className={idx === i ? 'on' : ''} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-ghost" onClick={() => setI((n) => (n + 1) % leads.length)}>›</button>
          </div>
          <div className="tag-open">● {lead.status}</div>
          <div className="lead-name">
            <span className="dot-avatar a-mint">{lead.initials}</span>
            <div style={{ flex: 1 }}>
              <b>{lead.name}</b>
              <p className="muted">Interested: {lead.interest} · ₹{lead.amount.toLocaleString('en-IN')}</p>
            </div>
            <span className="muted">{lead.sla}</span>
          </div>
          <div className="warn-box">☐ {lead.nextAction}</div>
          <div className="meter">
            ICP <div className="track"><i style={{ width: `${lead.icp}%` }} /></div> {lead.icp}%
          </div>
          <div className="meter">
            Lead Intent Score <div className="track"><i style={{ width: `${lead.intent}%` }} /></div> {lead.intent}
          </div>
          <button className="acc" onClick={() => setOpen((o) => ({ ...o, icp: !o.icp }))}>
            ICP FIT BREAKDOWN {open.icp ? '▾' : '›'}
            {open.icp && lead.icpBreakdown.map((b) => (
              <div key={b.label} className="meter"><span>{b.label}</span><div className="track"><i style={{ width: `${b.score}%` }} /></div>{b.score}</div>
            ))}
          </button>
          <button className="acc" onClick={() => setOpen((o) => ({ ...o, how: !o.how }))}>
            HOW WE GOT HERE {open.how ? '▾' : '›'}
            {open.how && <p className="muted">{lead.howWeGotHere}</p>}
          </button>
          <div className="signals">
            <button className="acc" onClick={() => setOpen((o) => ({ ...o, signals: !o.signals }))}>
              WHERE WE PICKED UP SIGNALS {open.signals ? '▾' : '›'}
            </button>
            {open.signals && lead.signals.map((s) => (
              <div key={s.title} className="sig"><b>{s.title}</b><p>{s.body}</p></div>
            ))}
          </div>
          {lead.missed > 0 && (
            <div className="missed-box">
              CUMULATIVE MISSED: {lead.missed} · {lead.missedNote}
            </div>
          )}
          <button
            className="btn-call"
            style={{ marginTop: 12 }}
            onClick={() => {
              onClose()
              call.setOpenDialer(true)
              void call.startAiCall(`${lead.name} · AI shopper`)
            }}
          >
            Call {lead.name}
          </button>
          <div className="pager">
            <button onClick={() => setI((n) => (n + leads.length - 1) % leads.length)}>‹</button>
            Prev
            <button onClick={() => setI((n) => (n + 1) % leads.length)}>›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
