# On-Ground.ai Call Centre app

Working product for the On-Ground engineering assignment. This is a call-centre agent console: dashboard, planner, calendar, Pulse, leads, and **live calling** (not a clickable mock).

## How to run

```bash
npm install
npm run dev
```

Open the printed `http://localhost:5173` URL in **Chrome**. Allow the microphone when prompted.

```bash
npm run build
```

## Stack and why

- **React + TypeScript + Vite** — preferred in the brief, fast to iterate, easy to read.
- **react-router-dom** — screens as routes (`/`, `/plan/calls`, `/plan/incoming`, `/plan/recent`, `/calendar`, `/pulse`, `/practice`).
- **recharts** — 7-day calls and CSAT bars.
- **peerjs** — browser WebRTC for human-to-human audio without standing up a signalling server.
- **Data** — `src/data/mock.ts` only. No backend, no copied mock HTML/CSS.

## Calling (required)

Screens alone are not the demo. Calling is wired through `src/calling/CallContext.tsx`.

### Human-to-human (in-app / phone)

1. Open the app in Chrome. Click the green dial button (or the DEMO strip).
2. Wait until **Your ID** appears (PeerJS cloud signalling).
3. Open a **second Chrome tab** (or another laptop) on the same URL.
4. Paste tab A’s ID into tab B (or the reverse) and click **Call human**.
5. Allow the mic on both sides. You should hear two-way audio.

**In-app call** vs **Phone call**: same live WebRTC path. Phone mode adds a keypad so a shared code / peer ID can be dialled like a number. Real PSTN (calling a mobile from the public phone network) needs a carrier such as Twilio; this assignment has no backend, so the working product is browser-to-browser audio that two people can actually talk on.

### AI-to-human

Two paths, both using the real mic + speech APIs:

- **Practise a call** (`/practice`): the shopper speaks with `speechSynthesis` (TTS). You answer with Chrome speech recognition (STT). Scripted SOP turns.
- **Call AI shopper** (dialer, Call back, lead modal): starts an in-call session, takes the mic, and the AI shopper talks on a timer so you can speak over it like a live call.

### How it was made to work

PeerJS issues a peer ID, `getUserMedia({ audio: true })` captures the mic, `peer.call(remoteId, stream)` sends that track, and the remote `MediaStream` is attached to a hidden `<audio>` element. Incoming calls use `call.answer(stream)`. AI turns do not need a second peer: TTS plays locally while the mic stays open for the agent.

## Done vs skipped

**Must-build — done**

- App shell (sidebar + top bar)
- Dashboard (KPIs, progress, who’s waiting, earnings, tasks, charts)
- Plan: Calls to make (ranked, expandable, paging), Incoming (value at stake + Call back), Recent (tap to SOP review)
- Calendar (month grid, dots, today, month switcher)
- Pulse home + a channel chat
- Leads modal with paging, ICP / intent, collapsible buying signals

**Bonus — done**

- Send a message in a channel
- Answer the “Needs your input” card
- Practise a call + Call back
- Phone-width layout (hamburger nav)
- Charts (recharts)

**Optional / skipped**

- DEMO strip and floating dial are implemented (assignment said optional).
- Pixel-identical hover/scroll from the original HTML mock: the mock file was not in the packet I received, so layout is rebuilt from the assignment PDF screenshots, not by copying mock source.
- Twilio/PSTN trunk.

## AI tools used

Cursor Grok 4.6 (agent) helped scaffold the React app, match the PDF screens, and wire PeerJS + Web Speech. I can walk through any file.

## Demo tips for reviewers

1. Dashboard → **2 hot leads** opens the leads modal (next/prev).
2. Incoming → **Call back** starts an AI-to-human call.
3. Two Chrome tabs → paste peer IDs → **Call human** for human-to-human.
4. Pulse → `# callcentre-agent` → confirm/reschedule the pinned card and send a chat line.
5. Record up to 2 minutes covering those four beats.
