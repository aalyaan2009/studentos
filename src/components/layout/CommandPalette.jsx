import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CornerDownLeft, FileText, GraduationCap, ListChecks, Search, Timer } from 'lucide-react'
import { useApp } from '../../context/appStore'
import { PRIMARY_NAV, SECONDARY_NAV } from '../../constants/navigation'
import { cn } from '../../utils/cn'

const TYPE_ICONS = { task: ListChecks, exam: GraduationCap, note: FileText, subject: GraduationCap }

export function CommandPalette({ open, onClose, actions }) {
  const navigate = useNavigate()
  const { tasks, exams, notes, subjects } = useApp()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      window.setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [open])

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const commands = [
      { id: 'cmd-task', label: 'Add task', hint: 'N', icon: ListChecks, run: actions.openTaskModal },
      { id: 'cmd-exam', label: 'Add exam', hint: '', icon: GraduationCap, run: actions.openExamModal },
      { id: 'cmd-note', label: 'Create note', hint: '', icon: FileText, run: actions.openNoteModal },
      { id: 'cmd-focus', label: 'Start focus session', hint: 'F', icon: Timer, run: () => navigate('/focus') },
    ].filter((item) => !needle || item.label.toLowerCase().includes(needle))

    const pages = [...PRIMARY_NAV, ...SECONDARY_NAV]
      .filter((item) => !needle || item.label.toLowerCase().includes(needle))
      .map((item) => ({
        id: `page-${item.to}`,
        label: `Open ${item.label}`,
        hint: `⌘${item.shortcut || ''}`,
        icon: item.icon,
        run: () => navigate(item.to),
      }))

    const records = needle
      ? [
          ...tasks
            .filter((task) => task.title.toLowerCase().includes(needle))
            .slice(0, 4)
            .map((task) => ({
              id: `task-${task.id}`,
              label: task.title,
              meta: task.subject || 'Task',
              type: 'task',
              run: () => navigate('/tasks'),
            })),
          ...exams
            .filter((exam) => exam.title.toLowerCase().includes(needle))
            .slice(0, 3)
            .map((exam) => ({
              id: `exam-${exam.id}`,
              label: exam.title,
              meta: exam.subject || 'Exam',
              type: 'exam',
              run: () => navigate('/exams'),
            })),
          ...notes
            .filter((note) => note.title.toLowerCase().includes(needle))
            .slice(0, 3)
            .map((note) => ({
              id: `note-${note.id}`,
              label: note.title,
              meta: note.subject || 'Note',
              type: 'note',
              run: () => navigate('/notes'),
            })),
          ...subjects
            .filter((subject) => subject.name.toLowerCase().includes(needle))
            .slice(0, 3)
            .map((subject) => ({
              id: `subject-${subject.id}`,
              label: subject.name,
              meta: 'Subject',
              type: 'subject',
              run: () => navigate('/subjects'),
            })),
        ]
      : []

    return [
      { title: 'Actions', items: commands },
      { title: 'Navigation', items: pages },
      { title: 'Results', items: records },
    ].filter((group) => group.items.length > 0)
  }, [actions, exams, navigate, notes, query, subjects, tasks])

  const flat = useMemo(() => groups.flatMap((group) => group.items), [groups])

  useEffect(() => {
    setActiveIndex((current) => (current >= flat.length ? 0 : current))
  }, [flat.length])

  const runItem = (item) => {
    onClose()
    item.run()
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => (current + 1) % Math.max(flat.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => (current - 1 + flat.length) % Math.max(flat.length, 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const item = flat[activeIndex]
      if (item) runItem(item)
    } else if (event.key === 'Escape') {
      onClose()
    }
  }

  let cursor = -1

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
          <motion.button
            type="button"
            aria-label="Close command palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-slate-800/80 px-4">
              <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search tasks, exams, notes or run a command..."
                aria-label="Command palette search"
                className="h-14 flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
              />
              <kbd className="rounded-md border border-slate-700 bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-400">
                Esc
              </kbd>
            </div>
            <div className="max-h-[52vh] overflow-y-auto py-2">
              {flat.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-slate-500">No matches for “{query}”.</p>
              ) : (
                groups.map((group) => (
                  <div key={group.title} className="px-2 py-1">
                    <p className="px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-600">{group.title}</p>
                    <ul>
                      {group.items.map((item) => {
                        cursor += 1
                        const index = cursor
                        const Icon = item.icon || TYPE_ICONS[item.type] || Search
                        return (
                          <li key={item.id}>
                            <button
                              type="button"
                              onMouseEnter={() => setActiveIndex(index)}
                              onClick={() => runItem(item)}
                              className={cn(
                                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                                index === activeIndex ? 'bg-cyan-500/10 text-slate-50' : 'text-slate-300 hover:bg-slate-800/50',
                              )}
                            >
                              <Icon className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                              <span className="flex-1 truncate">{item.label}</span>
                              {item.meta ? (
                                <span className="text-[10px] uppercase tracking-wider text-slate-600">{item.meta}</span>
                              ) : null}
                              {item.hint ? <span className="text-[10px] text-slate-600">{item.hint}</span> : null}
                              {index === activeIndex ? (
                                <CornerDownLeft className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                              ) : null}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
