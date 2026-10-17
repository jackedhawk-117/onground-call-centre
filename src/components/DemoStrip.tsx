import { useCall } from '../calling/CallContext'

export function DemoStrip() {
  const call = useCall()
  return (
    <div className="demo-strip">
      <span className="tag">DEMO</span>
      <button className={call.mode === 'in-app' ? 'on' : ''} onClick={() => call.setMode('in-app')}>
        📞 In-app call
      </button>
      <button className={call.mode === 'phone' ? 'on' : ''} onClick={() => call.setMode('phone')}>
        📱 Phone call
      </button>
      <button style={{ color: '#16a34a', fontSize: 16 }} aria-label="Status">🛡️</button>
    </div>
  )
}
