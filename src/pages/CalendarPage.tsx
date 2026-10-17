import { useMemo, useState } from 'react'
import { calendarEvents } from '../data/mock'

export function CalendarPage() {
  const [cursor, setCursor] = useState(() => new Date(2026, 9, 1))
  const today = new Date()

  const grid = useMemo(() => {
    const y = cursor.getFullYear()
    const m = cursor.getMonth()
    const first = new Date(y, m, 1)
    const startPad = first.getDay()
    const days = new Date(y, m + 1, 0).getDate()
    const cells: { d: number | null; iso?: string }[] = []
    for (let i = 0; i < startPad; i++) cells.push({ d: null })
    for (let d = 1; d <= days; d++) {
      const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      cells.push({ d, iso })
    }
    return cells
  }, [cursor])

  const label = cursor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
  const upcoming = Object.entries(calendarEvents)

  return (
    <>
      <h2 style={{ margin: '0 0 4px', fontSize: 16 }}>📅 Calendar</h2>
      <p className="muted">Mirrored from your mailbox — invites created here land there too</p>
      <div className="info">Store visits, coaching sessions, and meeting invites all show up here — and in your mailbox.</div>
      <div className="cal-wrap">
        <div className="cal-head">
          <button className="btn-ghost" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>‹</button>
          <h2>{label}</h2>
          <div className="cal-nav">
            <button className="btn-ghost" onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}>Today</button>
            <button className="btn-ghost" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>›</button>
          </div>
        </div>
        <div className="cal-grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => <div key={d} className="dow">{d}</div>)}
          {grid.map((c, i) => {
            const isToday = c.iso &&
              today.getFullYear() === cursor.getFullYear() &&
              today.getMonth() === cursor.getMonth() &&
              today.getDate() === c.d
            return (
              <div key={i} className={`day ${c.d ? '' : 'empty'} ${isToday ? 'today' : ''}`}>
                {c.d}
                {c.iso && calendarEvents[c.iso] && <div className="cal-dot" />}
              </div>
            )
          })}
        </div>
      </div>
      <div className="upcoming">
        <h3>UPCOMING</h3>
        {upcoming.map(([iso, evs]) => evs.map((e) => (
          <div className="list-row" key={iso + e.title}>
            <div className="meta"><b>{e.title}</b><p>{iso} · {e.time}</p></div>
          </div>
        )))}
      </div>
    </>
  )
}
