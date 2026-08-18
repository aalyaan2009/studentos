import { motion } from 'framer-motion'
import { GraduationCap, ListChecks, Pencil, Trash2, User } from 'lucide-react'
import { ProgressBar } from '../ui/Progress'
import { colorMeta } from '../../constants/theme'
import { cn } from '../../utils/cn'

export function SubjectCard({ subject, taskCount, examCount, onEdit, onDelete }) {
  const color = colorMeta(subject.color)
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 backdrop-blur-md transition-colors duration-200 hover:border-slate-700"
    >
      <span className={cn('absolute inset-x-0 top-0 h-px', color.soft)} aria-hidden="true" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl border', color.border, color.soft)}>
            <span className={cn('h-2 w-2 rounded-full', color.dot)} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">{subject.name}</h3>
            <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <User className="h-3 w-3" aria-hidden="true" />
              {subject.teacher || 'No teacher set'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(subject)}
            aria-label={`Edit ${subject.name}`}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800/70 hover:text-slate-200"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(subject)}
            aria-label={`Delete ${subject.name}`}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
        <span className={cn('text-lg font-semibold', color.text)}>{subject.grade}</span>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
            {taskCount} tasks
          </span>
          <span className="flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            {examCount} exams
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-500">
          <span>Course progress</span>
          <span>{subject.progress}%</span>
        </div>
        <ProgressBar value={subject.progress} tone={subject.color} label={`${subject.name} progress`} />
      </div>
    </motion.article>
  )
}
