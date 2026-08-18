import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { ProgressRing } from '../ui/Progress'
import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/dates'
import { examUrgency } from '../../utils/analytics'

const URGENCY = {
  urgent: { tone: 'danger', ring: 'text-rose-400', label: 'Urgent' },
  warning: { tone: 'warning', ring: 'text-amber-400', label: 'Due soon' },
  normal: { tone: 'cyan', ring: 'text-cyan-400', label: 'On track' },
  neutral: { tone: 'default', ring: 'text-slate-500', label: 'Completed' },
}

export function ExamCard({ exam, onEdit, onDelete, onProgressChange }) {
  const urgency = URGENCY[examUrgency(exam.daysRemaining)] || URGENCY.normal
  const remaining =
    exam.daysRemaining === null
      ? 'No date'
      : exam.daysRemaining < 0
        ? `${Math.abs(exam.daysRemaining)} days ago`
        : exam.daysRemaining === 0
          ? 'Today'
          : `${exam.daysRemaining} days remaining`

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 backdrop-blur-md transition-colors duration-200 hover:border-slate-700"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-100">{exam.title}</h3>
            <Badge tone={urgency.tone}>{urgency.label}</Badge>
          </div>
          <p className="mt-1 text-xs text-slate-500">{exam.subject || 'General'}</p>
          <p className={cn('mt-3 text-lg font-semibold tracking-tight', urgency.ring)}>{remaining}</p>
          <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              <dd>{formatDate(exam.date, { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
            </div>
            {exam.time ? (
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                <dd>{exam.time}</dd>
              </div>
            ) : null}
            {exam.location ? (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                <dd>{exam.location}</dd>
              </div>
            ) : null}
          </dl>
        </div>
        <ProgressRing value={exam.progress} className={urgency.ring} size={68} label={`Preparation ${exam.progress}%`}>
          <span className="text-sm font-semibold text-slate-100">{exam.progress}%</span>
          <span className="text-[9px] uppercase tracking-wider text-slate-500">Prep</span>
        </ProgressRing>
      </div>

      {exam.notes ? <p className="mt-4 line-clamp-2 text-xs text-slate-500">{exam.notes}</p> : null}

      <div className="mt-4 flex items-center gap-3">
        <label className="flex-1">
          <span className="sr-only">{`Preparation progress for ${exam.title}`}</span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={exam.progress}
            onChange={(event) => onProgressChange(exam.id, Number(event.target.value))}
            className="w-full accent-cyan-400"
          />
        </label>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onEdit(exam)}
            aria-label={`Edit ${exam.title}`}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800/70 hover:text-slate-200"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(exam)}
            aria-label={`Delete ${exam.title}`}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
