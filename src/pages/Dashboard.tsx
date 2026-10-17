import { useOutletContext, useNavigate } from 'react-router-dom'
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from 'recharts'
import { agent, callsHandled, csatTrend, tasks, waiting } from '../data/mock'
import { IconPhoneRing, IconPeople, IconClipboard } from '../components/Icons'

type Ctx = { openLeads: () => void }

function hourLabel() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export function Dashboard() {
  const { openLeads } = useOutletContext<Ctx>()
  const nav = useNavigate()
  const earnPct = Math.min(100, ((agent.earnings - agent.earningsMin) / (agent.earningsMax - agent.earningsMin)) * 100)

  return (
    <>
      <section className="hero">
        <div className="hero-top">
          <div>
            <div className="kicker">{hourLabel()} 👋</div>
            <h1>{agent.name}</h1>
            <p className="sub">{agent.role}</p>
          </div>
          <div>
            <div className="queue">● {agent.queueStatus}</div>
            <div className="muted" style={{ color: 'rgba(255,255,255,0.7)' }}>This Week</div>
          </div>
        </div>
        <div className="kpis">
          <div className="kpi">
            <b>{agent.ogScore}</b>
            <span>OG SCORE™</span>
            <div className="delta up">▲ {agent.ogDelta}</div>
          </div>
          <div className="kpi">
            <b>{agent.avgHandle}</b>
            <span>AVG HANDLE TIME</span>
            <div className="delta down">▼ {Math.abs(agent.ahtDelta)}%</div>
          </div>
          <div className="kpi">
            <b>{agent.csat}%</b>
            <span>CSAT TODAY</span>
            <div className="delta up">▲ {agent.csatDelta}pt</div>
          </div>
          <div className="kpi">
            <b>{agent.inQueue}</b>
            <span>IN QUEUE</span>
            <div className="delta up">● live</div>
          </div>
        </div>
      </section>

      <div className="grid-2">
        <div>
          <div className="progress">
            <h3>▸ MY PROGRESS · TODAY</h3>
            <div className="progress-row">
              <div className="pbox">
                <b>{agent.leadsCreated}</b>
                Leads Created
                <div className="delta">▲ {agent.leadsCreatedDelta}</div>
              </div>
              <div className="pbox">
                <b>{agent.leadsCalled}</b>
                Leads Called
                <div className="delta">▲ {agent.leadsCalledDelta}</div>
              </div>
            </div>
          </div>
          <div className="section-h">
            <h3>WHO’S WAITING</h3>
            <button className="link" onClick={() => nav('/plan/calls')}>Open planner →</button>
          </div>
          {waiting.map((w) => (
            <div className="wait-row" key={w.id}>
              <span className="wait-icon"><IconPhoneRing size={16} /></span>
              <div className="meta">
                <b>{w.name}</b>
                <p>{w.reason}</p>
              </div>
              <span className={`badge ${w.tone}`}>{w.wait}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="card earn">
            <div className="earn-top">
              <span>My earnings this month</span>
              <span>₹{agent.earningsMin.toLocaleString('en-IN')} to ₹{agent.earningsMax.toLocaleString('en-IN')}</span>
            </div>
            <h2>₹{agent.earnings.toLocaleString('en-IN')}</h2>
            <p className="muted">₹{agent.earningsFromCoaching.toLocaleString('en-IN')} from coached moves</p>
            <div className="bar"><i style={{ width: `${earnPct}%` }} /></div>
          </div>
          <div className="card tasks">
            <div className="tasks-h">
              <span>My Tasks</span>
              <span className="count">{tasks.length}</span>
            </div>
            {tasks.map((t) => (
              <button
                key={t.id}
                className="task"
                onClick={() => {
                  if (t.action === 'leads') openLeads()
                  if (t.action === 'callbacks') nav('/plan/incoming')
                  if (t.action === 'recent') nav('/plan/recent')
                }}
              >
                <span className={`task-icon ${t.icon === 'phone' ? 'phone-icon' : t.icon === 'spark' ? 'spark-icon' : 'clip-icon'}`}>
                  {t.icon === 'phone' ? <IconPhoneRing size={14} /> : t.icon === 'spark' ? <IconPeople size={14} /> : <IconClipboard size={14} />}
                </span>
                <span><b>{t.title}</b> <span className="muted">{t.detail}</span></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card chart-card">
        <h3>CALLS HANDLED · LAST 7 DAYS</h3>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={callsHandled}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
            <Bar dataKey="value" fill="#5ee7c4" radius={[6, 6, 0, 0]}>
              <LabelList dataKey="value" position="top" fontSize={11} fill="#6b7285" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="card chart-card">
        <h3>CSAT TREND · LAST 7 DAYS</h3>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={csatTrend}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
            <Bar dataKey="value" fill="#93c5fd" radius={[6, 6, 0, 0]}>
              <LabelList dataKey="value" position="top" fontSize={11} fill="#6b7285" formatter={(v: any) => (v != null ? `${v}%` : '')} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
