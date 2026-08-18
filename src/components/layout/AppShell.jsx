import { useCallback, useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useApp } from '../../context/appStore'
import { UiContext } from '../../context/uiStore'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { MobileDrawer, MobileTabBar } from './MobileNav'
import { CommandPalette } from './CommandPalette'
import { TaskModal } from '../tasks/TaskModal'
import { ExamModal } from '../exams/ExamModal'
import { NoteEditorModal } from '../notes/NoteEditorModal'
import { SubjectModal } from '../subjects/SubjectModal'
import { ToastViewport } from '../ui/Toast'
import { taskMetrics } from '../../utils/analytics'
import { cn } from '../../utils/cn'

export function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()
  const { tasks, settings } = useApp()
  const [collapsed, setCollapsed] = useLocalStorage('sidebar-collapsed', false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [taskModal, setTaskModal] = useState({ open: false, task: null })
  const [examModal, setExamModal] = useState({ open: false, exam: null })
  const [noteModal, setNoteModal] = useState({ open: false, note: null })
  const [subjectModal, setSubjectModal] = useState({ open: false, subject: null })

  const openTaskModal = useCallback((task = null) => setTaskModal({ open: true, task }), [])
  const openExamModal = useCallback((exam = null) => setExamModal({ open: true, exam }), [])
  const openNoteModal = useCallback((note = null) => setNoteModal({ open: true, note }), [])
  const openSubjectModal = useCallback((subject = null) => setSubjectModal({ open: true, subject }), [])
  const openCommandPalette = useCallback(() => setCommandOpen(true), [])

  const ui = useMemo(
    () => ({ openTaskModal, openExamModal, openNoteModal, openSubjectModal, openCommandPalette }),
    [openCommandPalette, openExamModal, openNoteModal, openSubjectModal, openTaskModal],
  )

  const shortcuts = useMemo(
    () => ({
      'mod+k': () => setCommandOpen((current) => !current),
      n: () => openTaskModal(),
      f: () => navigate('/focus'),
      t: () => navigate('/tasks'),
      e: () => navigate('/exams'),
      'mod+1': () => navigate('/dashboard'),
      'mod+2': () => navigate('/tasks'),
      'mod+3': () => navigate('/exams'),
      'mod+4': () => navigate('/subjects'),
      'mod+5': () => navigate('/focus'),
      'mod+6': () => navigate('/notes'),
      'mod+7': () => navigate('/analytics'),
      'mod+8': () => navigate('/calendar'),
    }),
    [navigate, openTaskModal],
  )
  useKeyboardShortcuts(shortcuts)

  const metrics = taskMetrics(tasks)
  const badges = { '/tasks': metrics.overdue || undefined }

  return (
    <UiContext.Provider value={ui}>
      <MotionConfig reducedMotion={settings.reducedMotion ? 'always' : 'user'}>
      <div className="relative flex min-h-screen bg-[#070A0F] text-slate-200">
        <div className="app-backdrop" aria-hidden="true" />
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((current) => !current)}
          badges={badges}
          displayName={settings.displayName}
        />
        <div className="relative flex min-w-0 flex-1 flex-col">
          <Topbar
            onOpenCommand={openCommandPalette}
            onOpenTask={() => openTaskModal()}
            onOpenMobileNav={() => setMobileNavOpen(true)}
          />
          <main className={cn('flex-1 px-4 pb-24 sm:px-6 lg:pb-10', settings.compactDensity ? 'pt-4' : 'pt-6')}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="mx-auto w-full max-w-[1400px]"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        <MobileDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <MobileTabBar />
        <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} actions={ui} />
        <TaskModal open={taskModal.open} task={taskModal.task} onClose={() => setTaskModal({ open: false, task: null })} />
        <ExamModal open={examModal.open} exam={examModal.exam} onClose={() => setExamModal({ open: false, exam: null })} />
        <NoteEditorModal open={noteModal.open} note={noteModal.note} onClose={() => setNoteModal({ open: false, note: null })} />
        <SubjectModal
          open={subjectModal.open}
          subject={subjectModal.subject}
          onClose={() => setSubjectModal({ open: false, subject: null })}
        />
        <ToastViewport />
      </div>
      </MotionConfig>
    </UiContext.Provider>
  )
}
