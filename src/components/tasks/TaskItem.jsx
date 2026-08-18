import { motion } from 'framer-motion'
import { Check, Pencil, Star, Trash2 } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { cn } from '../../utils/cn'
import { priorityMeta } from '../../constants/theme'
import { formatRelativeDay, isOverdue } from '../../utils/dates'

export function TaskItem({ task, onToggle, onEdit, onDelete, onTogglePriority, isPriority = false }) {
  const priority = priorityMeta(task.priority)
  const overdue = !task.completed && isOverdue(task.dueDate)

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.18 } }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'group relative flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5 transition-colors duration-200 hover:border-slate-700',
        task.completed && 'opacity-60',
      )}
    >
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-pressed={task.completed}
        aria-label={task.completed ? `Reopen ${task.title}` : `Complete ${task.title}`}
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70',
          task.completed
            ? 'border-emerald-400/60 bg-emerald-500/20 text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.35)]'
            : 'border-slate-700 text-transparent hover:border-cyan-400/70',
        )}
      >
        <motion.span
          initial={false}
          animate={{ scale: task.completed ? 1 : 0.4, opacity: task.completed ? 1 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <Check className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'text-sm font-medium text-slate-100 transition-all duration-200',
              task.completed && 'text-slate-500 line-through',
            )}
          >
            {task.title}
          </span>
          <Badge className={priority.chip}>{priority.label}</Badge>
          {task.subject ? <Badge>{task.subject}</Badge> : null}
        </div>
        {task.description ? (
          <p className="mt-1 line-clamp-2 text-xs text-slate-500">{task.description}</p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span className={cn(overdue && 'text-rose-400')}>{formatRelativeDay(task.dueDate)}</span>
          {(task.tags || []).map((tag) => (
            <span key={tag} className="rounded-md bg-slate-800/70 px-1.5 py-0.5 text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-200 focus-within:opacity-100 group-hover:opacity-100">
        {onTogglePriority ? (
          <button
            type="button"
            onClick={() => onTogglePriority(task.id)}
            aria-label={isPriority ? `Remove ${task.title} from today's focus` : `Add ${task.title} to today's focus`}
            className={cn(
              'rounded-lg p-1.5 transition-colors hover:bg-slate-800/70',
              isPriority ? 'text-amber-300' : 'text-slate-500 hover:text-amber-300',
            )}
          >
            <Star className={cn('h-3.5 w-3.5', isPriority && 'fill-amber-300')} />
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
          className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800/70 hover:text-slate-200"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          aria-label={`Delete ${task.title}`}
          className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.li>
  )
}
