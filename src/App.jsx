import { Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { AppShell } from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Exams from './pages/Exams'
import Subjects from './pages/Subjects'
import Focus from './pages/Focus'
import Notes from './pages/Notes'
import Analytics from './pages/Analytics'
import Calendar from './pages/Calendar'
import Settings from './pages/Settings'
import Help from './pages/Help'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}
