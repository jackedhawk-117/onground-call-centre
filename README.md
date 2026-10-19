# On-Ground.ai Call Centre Console

Working product submission for the **On-Ground.ai Engineering Hire Assignment**.

A complete, responsive call-centre agent console built from scratch with **React 19 + TypeScript + Vite**, featuring **functional live audio calling** (WebRTC human-to-human audio & AI-to-human voice loops), real-time in-call transcript captions, interactive CRM planning, leads modal, team channels, and calendar.

---

## Quick Start

```bash
# 1. Clone & install dependencies
git clone https://github.com/jackedhawk-117/onground-call-centre.git
cd onground-call-centre
npm install

# 2. Run local development server
npm run dev
```

Open `http://localhost:5173` in **Google Chrome**. Allow microphone access when prompted.

```bash
# Production type-check & build
npm run build
```

---

## Tech Stack & Architectural Decisions

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | **React 19 + TypeScript** | Preferred in the brief. Provides clean component hierarchy, strict type safety, and zero compile warnings. |
| **Build Tool** | **Vite 7** | Sub-second HMR, instant startup, and optimized production chunking. |
| **Routing** | **React Router v7** | Modular screen routing (`/`, `/plan/calls`, `/plan/incoming`, `/plan/recent`, `/calendar`, `/pulse`, `/practice`). |
| **Charts** | **Recharts** | Renders 7-day Calls Handled and CSAT Trend charts with exact numeric values atop each bar. |
| **Voice Calling** | **PeerJS (WebRTC)** | Browser-to-browser live audio calling using cloud signaling without requiring a custom backend. |
| **Voice AI / TTS** | **Web Speech API** | Client-side speech synthesis (TTS) and speech recognition (STT) for interactive customer voice turns. |
| **Styling** | **Custom CSS Variables** | Zero heavy UI framework overhead; faithful replication of the official mock's typography, glowing notifications, spinning avatar ring, and command-center dark theme. |
| **Data Layer** | `src/data/mock.ts` | Clean client-side domain mock. Zero backend dependency, meeting the "no backend" ground rule. |

---

## Calling Architecture (Required Working Product)

The assignment requires a **working calling feature** rather than static screens. Calling is managed centrally via `src/calling/CallContext.tsx`.

### 1. Human-to-Human Audio Calling (WebRTC)
- **How to test**:
  1. Open the app in Chrome. Click the floating green dialer button ☎ (or the bottom DEMO strip).
  2. Copy your unique Peer ID displayed under **Your ID**.
  3. Open a **second Chrome tab** (or another laptop/browser) at `http://localhost:5173`.
  4. Paste Tab A's ID into Tab B's dialer input and click **Call human**.
  5. Both browsers will transition to `Live · human-to-human` with live two-way audio streaming through the speakers and microphones.
- **Why WebRTC instead of PSTN**:
  Real PSTN dialing (calling a physical mobile phone number over cellular networks) requires a paid cloud telephony carrier (Twilio, Exotel, or Plivo), regulatory telecom compliance (TRAI KYC in India), and private backend server secrets. Because the assignment specifies a purely client-side application with **"no backend"**, WebRTC browser-to-browser voice via PeerJS is the standard engineering solution to deliver real, two-way audio between two humans.

### 2. AI-to-Human Voice Calling
- **Call Back Flow** (`/plan/incoming`):
  - Clicking **Call back** on any missed lead (e.g. *Faizan A.*) opens the active call sheet, captures the microphone, and speaks the customer's opening line.
  - The shopper continues conversational turns on a realistic timer, allowing the agent to speak their response over the mic.
- **Real-Time In-Call Captions**:
  - Live transcript captions display the shopper's current speech inside the dialer sheet in real-time, ensuring the conversation is clear even if the reviewer's volume is muted or on Linux systems without system speech dispatchers.
- **SOP Practice Flow** (`/practice`):
  - Interactive turn-by-turn voice scenario. The customer persona speaks via `window.speechSynthesis` (TTS), and the agent responds using Chrome's microphone speech recognition (`webkitSpeechRecognition`).

---

## Feature Implementation Matrix

### Must-Build Screens (100% Complete)
- [x] **App Shell**: Responsive sidebar with distinct icon-chips (`.in-icon`), glowing notification bell, and spinning gold/teal conic avatar ring.
- [x] **Dashboard**: 4 KPI cards (OG Score, Avg Handle Time, CSAT, In Queue), progress metrics, "Who's Waiting" list, slab earnings tracker, tasks card, and 7-day charts with value labels.
- [x] **Plan — Calls to make**: Attractiveness-ranked leads, expandable detail cards (notes, last touch, phone), and `Page 1 of 3` pagination.
- [x] **Plan — Incoming**: Missed calls list, calculated ₹81,860 value at stake, and one-click **Call back** action on every row.
- [x] **Plan — Recent**: Calls by type/duration and tap-to-expand **SOP review checklist** (first 10s greeting, discovery questions, next step).
- [x] **Calendar**: October 2026 month grid, event dots (Oct 23, 26, 28), month switcher, and "Today" reset button.
- [x] **Pulse Home**: AvaniBot card (Daily Brief & Ask a question), categorized agent cards with left-border accents (**ROLE AGENTS**, **TASK AGENTS**, **GENERAL**), and Kudos feed.
- [x] **Pulse Channel Chat** (`#callcentre-agent`): Pinned interactive "Needs your input" card (Confirmed/Reschedule buttons + custom reply), chat feed with sender avatars (`SR` / `AR`), and composer bar with emoji picker.
- [x] **Leads Modal**: Triggered from dashboard task list, dot pager, ICP score bar (`87%`), Lead Intent score badge (`91`), collapsible accordions (*ICP Fit Breakdown*, *How we got here*, *Where we picked up signals*), and primary *Place call* action.

### Bonus Items (100% Complete)
- [x] **Send a message in a channel**: Real-time chat messaging with automatic sender alignment and timestamps.
- [x] **Answer "Needs your input" card**: Resolves callback confirmation and updates channel feed.
- [x] **Practise a call**: Interactive voice training module with SOP hints.
- [x] **Mobile Responsive**: Fully responsive layout down to phone widths with hamburger drawer navigation.
- [x] **Live Calling Demo Strip & Floating Keypad**: Floating dialer supporting In-App call and Phone keypad modes.

---

## AI Tools Used

In accordance with assignment guidelines:
- **Cursor Grok 4.6 & Google Antigravity (Claude Opus 4.6 & Gemini 3.8 Flash)**:
  - Assisted in scaffolding initial React components from the assignment PDF screenshots.
  - Extracted design tokens (conic avatar ring, pulsing bell, radial command-center hero) from `OnGround_CallCentre_App_Mock.html` for pixel fidelity.
  - Implemented the PeerJS WebRTC calling context and Web Speech integration.
  - All application code is written specifically for this project without copying proprietary mock source.

---

## Reviewer Demo Walkthrough (Under 2 Minutes)

1. **Dashboard & Leads** (`0:00 - 0:30`):
   - Review top KPI cards and 7-day charts with value labels.
   - Click **2 hot leads** in *My Tasks* to open the Leads Modal; page through leads and expand the ICP breakdown and buying signals.
2. **Planner & AI Call Back** (`0:30 - 1:00`):
   - Switch to **Plan → Incoming** (note the ₹81,860 at stake).
   - Click **Call back** on *Faizan A.* to see the live calling sheet, in-call captions, and voice interaction.
3. **Human-to-Human WebRTC** (`1:00 - 1:30`):
   - Open two tabs side-by-side, dial Tab A's Peer ID from Tab B, and verify real-time two-way browser audio.
4. **Pulse & Team Channel** (`1:30 - 2:00`):
   - Open **Pulse**, click `# callcentre-agent`, click **Confirmed** on the pinned card, and send a message in the composer.
