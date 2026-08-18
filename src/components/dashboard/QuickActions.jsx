import { CalendarDays, FileText, GraduationCap, Plus, Timer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card, CardHeader } from '../ui/Card'
import { useUi } from '../../context/uiStore'

export function QuickActions() {
  const navigate = useNavigate()
  const { openTaskModal, openExamModal, openNoteModal } = useUi()

  const actions = [
    { label: 'Add Task', icon: Plus, run: () => openTaskModal() },
    { label: 'Add Exam', icon: GraduationCap, run: () => openExamModal() },
    { label: 'Start Focus', icon: Timer, run: () => navigate('/focus') },
    { label: 'Create Note', icon: FileText, run: () => openNoteModal() },
    { label: 'View Calendar', icon: CalendarDays, run: () => navigate('/calendar') },
  ]

  return (
    <Card>
      <CardHeader title="Quick Actions" description="Capture things fast." />
      <div className="grid grid-cols-2 gap-2 p-4">
        {actions.map((action) => (
          <motion.button
            key={action.label}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.run}
            className="flex items-center gap-2.5 rounded-xl border border-slate-800/80 bg-slate-950/40 px-3 py-2.5 text-left text-xs font-medium text-slate-300 transition-colors hover:border-cyan-500/30 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
          >
            <action.icon className="h-4 w-4 text-cyan-300/80" aria-hidden="true" />
            {action.label}
          </motion.button>
        ))}
      </div>
    </Card>
  )
}
