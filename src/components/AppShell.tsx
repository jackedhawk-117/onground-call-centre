import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { agent } from '../data/mock'
import { IconCal, IconGrid, IconPhone, IconPulse } from './Icons'
import { Dialer } from './Dialer'
import { DemoStrip } from './DemoStrip'
import { LeadsModal } from './LeadsModal'
import { useCall } from '../calling/CallContext'

export function AppShell() {
  const [navOpen, setNavOpen] = useState(false)
  const [leadsOpen, setLeadsOpen] = useState(false)
  const loc = useLocation()
  const call = useCall()
  const planOn = loc.pathname.startsWith('/plan')

  return (
    <div className="app">
      <aside className={`sidebar ${navOpen ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">OG</span>
          On-Ground.ai
        </div>
        <NavLink to="/" className={({ isActive }) => `nav-item nav-dash ${isActive ? 'active' : ''}`} onClick={() => setNavOpen(false)} end>
          <span className="in-icon chip-dash"><IconGrid /></span> Dashboard
        </NavLink>
        <NavLink to="/plan/calls" className={`nav-item nav-plan ${planOn ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
          <span className="in-icon chip-plan"><IconPhone /></span> Plan
        </NavLink>
        <NavLink to="/plan/calls" className={({ isActive }) => `nav-sub ${isActive ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
          Calls to make
        </NavLink>
        <NavLink to="/plan/incoming" className={({ isActive }) => `nav-sub ${isActive ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
          Incoming
        </NavLink>
        <NavLink to="/plan/recent" className={({ isActive }) => `nav-sub ${isActive ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
          Recent
        </NavLink>
        <NavLink to="/practice" className={({ isActive }) => `nav-sub nav-ghost ${isActive ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
          Practise a call
        </NavLink>
        <div className="nav-gap" />
        <NavLink to="/calendar" className={({ isActive }) => `nav-item nav-cal ${isActive ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
          <span className="in-icon chip-cal"><IconCal /></span> Calendar
        </NavLink>
        <NavLink to="/pulse" className={({ isActive }) => `nav-item nav-pulse ${isActive ? 'active' : ''}`} onClick={() => setNavOpen(false)}>
          <span className="in-icon chip-pulse"><IconPulse /></span> Pulse
        </NavLink>
      </aside>
      <div className="main">
        <header className="topbar">
          <div className="top-left">
            <button className="icon-btn menu-btn" onClick={() => setNavOpen((v) => !v)} aria-label="Menu">
              ☰
            </button>
            <span className="og-pill">OG</span>
            On-Ground.ai
          </div>
          <div className="top-right">
            <button className="notif-bell" aria-label="Alerts">
              <span className="notif-bell-icon">🔔</span>
            </button>
            <div className="global-ranks">
              <span className="grank-pill teal">{agent.ogScore}</span>
              <span className="grank-pill gold">★ #{agent.rank}</span>
            </div>
            <div className="ar-badge" title="Arvind Rajan · The Sleep Company">
              <div className="ar-badge-ring" />
              <div className="ar-badge-inner">
                <span className="ar-badge-initials">{agent.initials}</span>
              </div>
            </div>
          </div>
        </header>
        <div className="content">
          <Outlet context={{ openLeads: () => setLeadsOpen(true) }} />
        </div>
      </div>
      <DemoStrip />
      <button className="fab" onClick={() => call.setOpenDialer(true)} aria-label="Open dialer">
        ☎
      </button>
      <Dialer />
      {leadsOpen && <LeadsModal onClose={() => setLeadsOpen(false)} />}
    </div>
  )
}
