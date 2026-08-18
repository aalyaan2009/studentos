import { motion } from 'framer-motion'
import { formatDate } from '../../utils/dates'
import { examUrgency } from '../../utils/analytics'
import { cn } from '../../utils/cn'

const DOTS = {
  urgent: 'bg-rose-400',
  warning: 'bg-amber-400',
  normal: 'bg-cyan-400',
  neutral: 'bg-slate-600',
}

export function ExamTimeline({ exams }) {
  if (exams.length === 0) return <p className="px-5 py-6 text-sm text-slate-500">No scheduled exams.</p>
  return (
    <ol className="relative space-y-4 px-5 py-5">
      <span className="absolute left-[26px] top-6 bottom-6 w-px bg-slate-800" aria-hidden="true" />
      {exams.map((exam, index) => (
        <motion.li
          key={exam.id}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: index * 0.04 }}
          className="relative flex items-center gap-4 pl-6"
        >
          <span
            className={cn('absolute left-0 h-2.5 w-2.5 rounded-full ring-4 ring-slate-950', DOTS[examUrgency(exam.daysRemaining)])}
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-200">{exam.title}</p>
            <p className="text-[11px] text-slate-500">
              {formatDate(exam.date, { weekday: 'short', month: 'short', day: 'numeric' })}
              {exam.time ? ` · ${exam.time}` : ''}
              {exam.location ? ` · ${exam.location}` : ''}
            </p>
          </div>
          <span className="shrink-0 text-xs text-slate-500">
            {exam.daysRemaining >= 0 ? `${exam.daysRemaining}d` : 'past'}
          </span>
        </motion.li>
      ))}
    </ol>
  )
}
