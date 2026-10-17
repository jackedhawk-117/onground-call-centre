import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Peer, type MediaConnection } from 'peerjs'

export type CallMode = 'in-app' | 'phone'
export type CallKind = 'human' | 'ai'

type CallState = {
  ready: boolean
  myId: string
  mode: CallMode
  status: 'idle' | 'calling' | 'in-call' | 'incoming'
  remoteLabel: string
  kind: CallKind
  error: string
  openDialer: boolean
}

type CallApi = CallState & {
  setMode: (mode: CallMode) => void
  setOpenDialer: (open: boolean) => void
  startHumanCall: (target: string, label?: string) => Promise<void>
  startAiCall: (label?: string) => Promise<void>
  acceptIncoming: () => Promise<void>
  hangUp: () => void
}

const Ctx = createContext<CallApi | null>(null)

function speak(text: string) {
  return new Promise<void>((resolve) => {
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 1
    u.pitch = 1.05
    u.onend = () => resolve()
    u.onerror = () => resolve()
    window.speechSynthesis.speak(u)
  })
}

const aiReplies = [
  "Thanks — I'm still comparing the Ortho GRID with another brand. Can you talk me through EMI?",
  'If you can send the quote today, I can decide tonight with my partner.',
  'That trial helps. Let me think — can someone call me back after 6?',
]

export function CallProvider({ children }: { children: ReactNode }) {
  const peerRef = useRef<Peer | null>(null)
  const connRef = useRef<MediaConnection | null>(null)
  const localRef = useRef<MediaStream | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const incomingRef = useRef<MediaConnection | null>(null)
  const aiTimer = useRef<number | null>(null)

  const [state, setState] = useState<CallState>({
    ready: false,
    myId: '',
    mode: 'in-app',
    status: 'idle',
    remoteLabel: '',
    kind: 'human',
    error: '',
    openDialer: false,
  })

  const attachRemote = useCallback((stream: MediaStream) => {
    const audio = audioRef.current
    if (!audio) return
    audio.srcObject = stream
    void audio.play().catch(() => undefined)
  }, [])

  const stopLocal = useCallback(() => {
    localRef.current?.getTracks().forEach((t) => t.stop())
    localRef.current = null
    if (audioRef.current) audioRef.current.srcObject = null
    if (aiTimer.current) {
      window.clearInterval(aiTimer.current)
      aiTimer.current = null
    }
    window.speechSynthesis.cancel()
  }, [])

  const hangUp = useCallback(() => {
    connRef.current?.close()
    incomingRef.current?.close()
    connRef.current = null
    incomingRef.current = null
    stopLocal()
    setState((s) => ({ ...s, status: 'idle', remoteLabel: '', error: '' }))
  }, [stopLocal])

  useEffect(() => {
    const peer = new Peer({
      debug: 0,
    })
    peerRef.current = peer
    peer.on('open', (id) => setState((s) => ({ ...s, ready: true, myId: id })))
    peer.on('error', (err) => {
      setState((s) => ({ ...s, error: err.message, ready: s.ready }))
    })
    peer.on('call', (call) => {
      incomingRef.current = call
      setState((s) => ({
        ...s,
        status: 'incoming',
        kind: 'human',
        remoteLabel: String(call.metadata?.label || call.peer),
        openDialer: true,
      }))
    })
    return () => {
      peer.destroy()
      stopLocal()
    }
  }, [stopLocal])

  const getMic = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    localRef.current = stream
    return stream
  }, [])

  const startHumanCall = useCallback(
    async (target: string, label?: string) => {
      const id = target.trim()
      if (!id) {
        setState((s) => ({ ...s, error: 'Enter a peer ID or shared room code' }))
        return
      }
      if (!peerRef.current) return
      try {
        const stream = await getMic()
        setState((s) => ({
          ...s,
          status: 'calling',
          kind: 'human',
          remoteLabel: label || id,
          error: '',
          openDialer: true,
        }))
        const call = peerRef.current.call(id, stream, { metadata: { label: 'On-Ground agent' } })
        connRef.current = call
        call.on('stream', (remote) => {
          attachRemote(remote)
          setState((s) => ({ ...s, status: 'in-call' }))
        })
        call.on('close', hangUp)
        call.on('error', (err) => setState((s) => ({ ...s, error: String(err) })))
      } catch (err) {
        setState((s) => ({ ...s, error: err instanceof Error ? err.message : 'Mic permission needed' }))
      }
    },
    [attachRemote, getMic, hangUp],
  )

  const acceptIncoming = useCallback(async () => {
    const call = incomingRef.current
    if (!call) return
    try {
      const stream = await getMic()
      call.answer(stream)
      connRef.current = call
      call.on('stream', (remote) => {
        attachRemote(remote)
        setState((s) => ({ ...s, status: 'in-call', kind: 'human' }))
      })
      call.on('close', hangUp)
    } catch (err) {
      setState((s) => ({ ...s, error: err instanceof Error ? err.message : 'Mic permission needed' }))
    }
  }, [attachRemote, getMic, hangUp])

  const startAiCall = useCallback(
    async (label = 'Priya Iyer · AI shopper') => {
      try {
        await getMic()
        setState((s) => ({
          ...s,
          status: 'in-call',
          kind: 'ai',
          remoteLabel: label,
          error: '',
          openDialer: true,
        }))
        await speak(`Hello, this is ${label.split('·')[0].trim()}. I visited the store and I still have a few questions.`)
        let i = 0
        aiTimer.current = window.setInterval(() => {
          const line = aiReplies[i % aiReplies.length]
          i += 1
          void speak(line)
        }, 18000)
      } catch (err) {
        setState((s) => ({ ...s, error: err instanceof Error ? err.message : 'Mic permission needed' }))
      }
    },
    [getMic],
  )

  const api = useMemo<CallApi>(
    () => ({
      ...state,
      setMode: (mode) => setState((s) => ({ ...s, mode })),
      setOpenDialer: (open) => setState((s) => ({ ...s, openDialer: open })),
      startHumanCall,
      startAiCall,
      acceptIncoming,
      hangUp,
    }),
    [state, startHumanCall, startAiCall, acceptIncoming, hangUp],
  )

  return (
    <Ctx.Provider value={api}>
      <audio ref={audioRef} autoPlay className="remote-audio" />
      {children}
    </Ctx.Provider>
  )
}

export function useCall() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCall must be inside CallProvider')
  return ctx
}
