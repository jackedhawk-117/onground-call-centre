import { useState } from 'react'
import { useCall } from '../calling/CallContext'

export function Dialer() {
  const call = useCall()
  const [target, setTarget] = useState('')

  if (!call.openDialer && call.status === 'idle') return null

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']

  return (
    <div className="call-sheet">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{call.mode === 'phone' ? 'Phone call' : 'In-app call'}</h3>
        <button className="btn-ghost" style={{ padding: '4px 8px', color: '#fff', background: 'transparent', borderColor: '#1f4a3c' }} onClick={() => call.setOpenDialer(false)}>
          ✕
        </button>
      </div>
      <p className="status-live">
        {call.ready ? `Your ID: ${call.myId}` : 'Connecting calling mesh…'}
      </p>
      {call.status !== 'idle' && (
        <p>
          {call.status === 'incoming' && `Incoming from ${call.remoteLabel}`}
          {call.status === 'calling' && `Calling ${call.remoteLabel}…`}
          {call.status === 'in-call' && `Live · ${call.kind === 'ai' ? 'AI-to-human' : 'human-to-human'} · ${call.remoteLabel}`}
        </p>
      )}
      {call.error && <p style={{ color: '#fda4af' }}>{call.error}</p>}

      {call.status === 'idle' && (
        <>
          <p style={{ fontSize: 12, color: '#9cb8ad' }}>
            {call.mode === 'in-app'
              ? 'Paste the other browser’s peer ID (second tab or teammate). Audio is WebRTC via PeerJS — no mock.'
              : 'Dial a shared room code or the other person’s peer ID. PSTN numbers need a carrier; this demo uses the same live WebRTC path so two humans can still talk.'}
          </p>
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder={call.mode === 'phone' ? 'Number or peer ID' : 'Peer ID'}
          />
          {call.mode === 'phone' && (
            <div className="pad">
              {digits.map((d) => (
                <button key={d} type="button" onClick={() => setTarget((t) => t + d)}>
                  {d}
                </button>
              ))}
            </div>
          )}
          <div className="call-actions">
            <button className="btn-primary" onClick={() => void call.startHumanCall(target)}>
              Call human
            </button>
            <button className="btn-ghost" onClick={() => void call.startAiCall()}>
              Call AI shopper
            </button>
          </div>
        </>
      )}

      {call.status === 'incoming' && (
        <div className="call-actions">
          <button className="btn-primary" onClick={() => void call.acceptIncoming()}>
            Answer
          </button>
          <button className="btn-ghost" onClick={call.hangUp}>
            Decline
          </button>
        </div>
      )}

      {call.status === 'in-call' && call.kind === 'ai' && call.lastUtterance && (
        <div className="call-caption">
          <div className="caption-badge">AI Shopper Speaking</div>
          <p>"{call.lastUtterance}"</p>
        </div>
      )}

      {(call.status === 'calling' || call.status === 'in-call') && (
        <button className="btn-primary" style={{ background: '#be123c', width: '100%', marginTop: 8 }} onClick={call.hangUp}>
          Hang up
        </button>
      )}
    </div>
  )
}
