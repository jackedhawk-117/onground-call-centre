export const agent = {
  name: 'Arvind Rajan',
  initials: 'AR',
  role: 'The Sleep Company · Call Centre',
  queueStatus: 'On Queue',
  ogScore: 76,
  ogDelta: 13,
  avgHandle: '4m 12s',
  ahtDelta: -8,
  csat: 94,
  csatDelta: 2,
  inQueue: 2,
  leadsCreated: 3,
  leadsCreatedDelta: 1,
  leadsCalled: 2,
  leadsCalledDelta: 2,
  earnings: 5200,
  earningsFromCoaching: 1700,
  earningsMin: 800,
  earningsMax: 6000,
  rank: 3,
  notifications: 1,
}

export const waiting = [
  { id: 'w1', name: 'Priya Iyer', reason: 'Likely billing dispute — flagged before', wait: '4m 20s', tone: 'hot' as const },
  { id: 'w2', name: 'Suresh Nair', reason: 'Plan upgrade enquiry', wait: '1m 50s', tone: 'warm' as const },
]

export const tasks = [
  { id: 't1', icon: 'phone' as const, title: '2 callbacks', detail: 'next 4:30pm', action: 'callbacks' },
  { id: 't2', icon: 'spark' as const, title: '2 hot leads', detail: 'untouched 24h', action: 'leads' },
  { id: 't3', icon: 'clip' as const, title: '1 outcome', detail: 'to log', action: 'recent' },
]

export const callsHandled = [
  { day: 'Mon', value: 18 },
  { day: 'Tue', value: 22 },
  { day: 'Wed', value: 15 },
  { day: 'Thu', value: 26 },
  { day: 'Fri', value: 20 },
  { day: 'Sat', value: 12 },
  { day: 'Today', value: 14 },
]

export const csatTrend = [
  { day: 'Mon', value: 88 },
  { day: 'Tue', value: 90 },
  { day: 'Wed', value: 85 },
  { day: 'Thu', value: 92 },
  { day: 'Fri', value: 89 },
  { day: 'Sat', value: 91 },
  { day: 'Today', value: 94 },
]

export type PlannedCall = {
  id: string
  initials: string
  name: string
  interest: string
  amount: number
  score: number
  phone: string
  notes: string
  lastTouch: string
}

export const plannedCalls: PlannedCall[] = [
  { id: 'p1', initials: 'RS', name: 'Ritu S.', interest: 'Smart Luxe Mattress', amount: 13390, score: 96, phone: '+91 90000 10001', notes: 'Visited Koramangala store yesterday. Asked about 100-night trial.', lastTouch: 'Store visit · yesterday' },
  { id: 'p2', initials: 'MK', name: 'Mukunda', interest: 'Ortho GRID', amount: 8490, score: 90, phone: '+91 90000 10002', notes: 'Quote pending. EMI question on last chat.', lastTouch: 'WhatsApp · 6h ago' },
  { id: 'p3', initials: 'KI', name: 'Kavitha R.', interest: 'Luxe Hybrid', amount: 24990, score: 88, phone: '+91 90000 10003', notes: 'Warm lead. Compared competitor pricing.', lastTouch: 'Missed call · yesterday' },
  { id: 'p4', initials: 'FA', name: 'Faizan A.', interest: 'Smart Ortho', amount: 24990, score: 84, phone: '+91 90000 10004', notes: 'Visited store, in CRM. High ticket.', lastTouch: 'Store · today 10:05' },
  { id: 'p5', initials: 'DP', name: 'Divya P.', interest: 'Original Mattress', amount: 18490, score: 71, phone: '+91 90000 10005', notes: 'Cold lead from campaign. Needs warmup script.', lastTouch: 'Inbound · yesterday' },
  { id: 'p6', initials: 'SN', name: 'Suresh Nair', interest: 'Plan upgrade', amount: 4990, score: 68, phone: '+91 90000 10006', notes: 'Existing customer, upgrade enquiry in queue.', lastTouch: 'Queue · live' },
]

export type MissedCall = {
  id: string
  name: string
  when: string
  tag: string
  expected: number | null
  phone: string
}

export const missedCalls: MissedCall[] = [
  { id: 'm1', name: 'Faizan A.', when: 'Missed Today 10:05 AM', tag: 'Visited store / in CRM', expected: 24990, phone: '+91 90000 10004' },
  { id: 'm2', name: 'Kavitha R.', when: 'Missed Yesterday 4:40 PM', tag: 'Warm lead', expected: 24990, phone: '+91 90000 10003' },
  { id: 'm3', name: 'Divya P.', when: 'Missed Yesterday 2:15 PM', tag: 'Cold lead', expected: 18490, phone: '+91 90000 10005' },
  { id: 'm4', name: 'Ritu S.', when: 'Missed Today 11:20 AM', tag: 'Visited store / in CRM', expected: 13390, phone: '+91 90000 10001' },
  { id: 'm5', name: 'Unknown', when: 'Missed Yesterday', tag: 'No prior record', expected: null, phone: '+91 90000 10999' },
]

export type RecentCall = {
  id: string
  name: string
  when: string
  duration: string
  direction: 'in' | 'out' | 'missed'
  sop: string[]
}

export const recentCalls: RecentCall[] = [
  { id: 'r1', name: 'Mukunda R.', when: '10:42 AM', duration: '4m 12s', direction: 'out', sop: ['Greeting in first 10s', 'Named the shopper', 'Asked next step', 'Logged outcome'] },
  { id: 'r2', name: 'Kavitha R.', when: 'Yesterday', duration: '2m 05s', direction: 'out', sop: ['Greeting in first 10s', 'Missed discovery questions', 'No next step booked'] },
  { id: 'r3', name: 'Unknown', when: 'Yesterday', duration: '—', direction: 'missed', sop: ['Missed inbound', 'No callback within SLA'] },
  { id: 'r4', name: 'Ritu S.', when: 'Today 11:20 AM', duration: '—', direction: 'missed', sop: ['Missed inbound', 'Callback still open'] },
  { id: 'r5', name: 'Faizan A.', when: 'Today 10:05 AM', duration: '—', direction: 'missed', sop: ['Missed inbound', 'High value at stake'] },
  { id: 'r6', name: 'Kavitha R.', when: 'Yesterday 4:40 PM', duration: '—', direction: 'missed', sop: ['Missed inbound'] },
  { id: 'r7', name: 'Divya P.', when: 'Yesterday 2:15 PM', duration: '—', direction: 'missed', sop: ['Missed inbound', 'Cold lead'] },
  { id: 'r8', name: 'Faizan A.', when: 'Mon', duration: '6m 40s', direction: 'in', sop: ['Greeting in first 10s', 'Named the shopper', 'Warranty trial mentioned'] },
]

export const calendarEvents: Record<string, { title: string; time: string }[]> = {
  '2026-10-23': [{ title: 'Store visit · Koramangala', time: '11:00' }],
  '2026-10-26': [{ title: 'Coaching with Rashmi', time: '16:00' }],
  '2026-10-28': [{ title: 'Team huddle', time: '09:30' }],
}

export type Lead = {
  id: string
  status: string
  initials: string
  name: string
  interest: string
  amount: number
  sla: string
  nextAction: string
  icp: number
  intent: number
  icpBreakdown: { label: string; score: number }[]
  howWeGotHere: string
  signals: { title: string; body: string }[]
  missed: number
  missedNote: string
}

export const leads: Lead[] = [
  {
    id: 'l1',
    status: 'OPEN',
    initials: 'MK',
    name: 'Mukunda',
    interest: 'Ortho GRID',
    amount: 8490,
    sla: '2h left',
    nextAction: 'Quote to be given to customer',
    icp: 87,
    intent: 91,
    icpBreakdown: [
      { label: 'Budget fit', score: 90 },
      { label: 'Product match', score: 88 },
      { label: 'Urgency', score: 82 },
    ],
    howWeGotHere: 'Walk-in at Koramangala, captured by floor agent, passed to call centre for quote follow-up.',
    signals: [
      { title: 'Financing Related', body: 'Asked specifically about EMI options on the Ortho GRID — budget is a live concern, not a blocker' },
      { title: 'Quotation Demanded', body: 'Compared pricing with a competitor before reaching out — price-anchored, expects a competitive number' },
      { title: 'Warranty Related', body: "Hasn't raised this yet — worth proactively mentioning the 100-night trial to reduce perceived risk" },
    ],
    missed: 2,
    missedNote: 'expired without close, visible to manager',
  },
  {
    id: 'l2',
    status: 'OPEN',
    initials: 'RS',
    name: 'Ritu S.',
    interest: 'Smart Luxe Mattress',
    amount: 13390,
    sla: '5h left',
    nextAction: 'Confirm delivery pincode',
    icp: 92,
    intent: 88,
    icpBreakdown: [
      { label: 'Budget fit', score: 94 },
      { label: 'Product match', score: 91 },
      { label: 'Urgency', score: 90 },
    ],
    howWeGotHere: 'Store visit yesterday. Floor notes dropped; call centre owns the close.',
    signals: [
      { title: 'Trial Interest', body: 'Asked how the 100-night trial works if they keep the old mattress' },
      { title: 'Partner decision', body: 'Wants to check with spouse tonight — book a callback after 8pm' },
    ],
    missed: 0,
    missedNote: '',
  },
  {
    id: 'l3',
    status: 'HOT',
    initials: 'FA',
    name: 'Faizan A.',
    interest: 'Smart Ortho',
    amount: 24990,
    sla: '1h left',
    nextAction: 'Call back — missed inbound',
    icp: 81,
    intent: 94,
    icpBreakdown: [
      { label: 'Budget fit', score: 80 },
      { label: 'Product match', score: 86 },
      { label: 'Urgency', score: 96 },
    ],
    howWeGotHere: 'Visited store, already in CRM. Missed today 10:05 AM.',
    signals: [
      { title: 'High ticket', body: 'Looking at Smart Ortho king — largest basket on today\'s board' },
    ],
    missed: 1,
    missedNote: 'callback SLA at risk',
  },
  {
    id: 'l4',
    status: 'WARM',
    initials: 'KI',
    name: 'Kavitha R.',
    interest: 'Luxe Hybrid',
    amount: 24990,
    sla: '8h left',
    nextAction: 'Handle competitor objection',
    icp: 78,
    intent: 74,
    icpBreakdown: [
      { label: 'Budget fit', score: 72 },
      { label: 'Product match', score: 84 },
      { label: 'Urgency', score: 70 },
    ],
    howWeGotHere: 'Warm lead, missed yesterday 4:40 PM.',
    signals: [
      { title: 'Competitor mention', body: 'Named Duroflex on the floor. Need a side-by-side on trial and firmness.' },
    ],
    missed: 1,
    missedNote: 'one missed callback',
  },
  {
    id: 'l5',
    status: 'COLD',
    initials: 'DP',
    name: 'Divya P.',
    interest: 'Original Mattress',
    amount: 18490,
    sla: '12h left',
    nextAction: 'Warm-up script, then discovery',
    icp: 64,
    intent: 55,
    icpBreakdown: [
      { label: 'Budget fit', score: 60 },
      { label: 'Product match', score: 70 },
      { label: 'Urgency', score: 48 },
    ],
    howWeGotHere: 'Campaign inbound, no store visit.',
    signals: [
      { title: 'Low intent', body: 'Short call, asked only for brochure. Do not push quote yet.' },
    ],
    missed: 1,
    missedNote: 'cold, still in SLA',
  },
]

export type ChatMsg = {
  id: string
  from: 'other' | 'me'
  author: string
  time: string
  text: string
}

export const initialChannelMessages: ChatMsg[] = [
  {
    id: 'c1',
    from: 'other',
    author: 'Sunita Rao',
    time: '2:05pm',
    text: 'STAKEHOLDERS: @You (Arvind R.), whole call centre shift',
  },
  {
    id: 'c2',
    from: 'other',
    author: 'Sunita Rao',
    time: '2:05pm',
    text: 'ISSUE DEFINITION: Greeting-in-first-10s QA score is at 71% this week, below our 85% target.',
  },
  {
    id: 'c3',
    from: 'other',
    author: 'Sunita Rao',
    time: '2:05pm',
    text: "SUGGESTED RESOLUTION: Let's push that up — open every call with the greeting script. I'll check back Friday.",
  },
  {
    id: 'c4',
    from: 'me',
    author: 'You',
    time: '2:10pm',
    text: "On it! Will make sure I open every call with the greeting script 👍",
  },
  {
    id: 'c5',
    from: 'other',
    author: 'Sunita Rao',
    time: '2:14pm',
    text: 'Great attitude Arvind 🌟',
  },
]

export const practiceScript = [
  { who: 'shopper' as const, text: "Hi, I walked into the Koramangala store yesterday. I'm looking at the Ortho GRID." },
  { who: 'hint' as const, text: 'Greet by name if you can, then confirm the product.' },
  { who: 'shopper' as const, text: 'The other brand was cheaper. Why should I pay more for this one?' },
  { who: 'hint' as const, text: 'Handle price with trial, warranty, and firmness — do not discount first.' },
  { who: 'shopper' as const, text: 'Can I do this on EMI? And can you send a quote today?' },
  { who: 'hint' as const, text: 'Close with a next step: send quote and book a callback.' },
]
