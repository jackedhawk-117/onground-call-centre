import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CallProvider } from './calling/CallContext'
import { AppShell } from './components/AppShell'
import { Dashboard } from './pages/Dashboard'
import { Plan } from './pages/Plan'
import { CalendarPage } from './pages/CalendarPage'
import { Pulse } from './pages/Pulse'
import { PulseChannel } from './pages/PulseChannel'
import { Practice } from './pages/Practice'

export default function App() {
  return (
    <CallProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="plan" element={<Navigate to="/plan/calls" replace />} />
            <Route path="plan/calls" element={<Plan />} />
            <Route path="plan/incoming" element={<Plan />} />
            <Route path="plan/recent" element={<Plan />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="pulse" element={<Pulse />} />
            <Route path="pulse/:channel" element={<PulseChannel />} />
            <Route path="practice" element={<Practice />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CallProvider>
  )
}
