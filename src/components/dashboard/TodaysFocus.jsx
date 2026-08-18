import { AnimatePresence, motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'
import { formatRelativeDay } from '../../utils/dates'

export function TodaysFocus({ priorities, candidates, onToggle, onComplete }) {
  return (
    <Card>
      <CardHeader
        title="Today's Focus"
        description="Pick up to three priorities for today."
        action={<span className="text-[11px] text-slate-600">{priorities.length}/3</span>}
      />
      <div className="p-4">
        <AnimatePresence initial={false}>
          {priorities.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
              <p className="text-sm text-slate-500">
                Nothing selected yet. Star the tasks that matter most today.
              </p>
              <ul className="space-y-2">
                {candidates.slice(0, 3).map((task) => (
                  <li key={task.id} className="flex items-center justify-between gap-3 rounded-xl bg-slate-950/40 px-3 py-2">
                    <span className="min-w-0 truncate text-xs text-slate-300">{task.title}</span>
                    <Button size="sm" variant="secondary" onClick={() => onToggle(task.id)}>
                      <Star className="h-3.5 w-3.5" />
                      Pin
                    </Button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <ol className="space-y-2.5">
              {priorities.map((task, index) => (
                <motion.li
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950/40 p-3"
                >
                  <span className="text-sm font-semibold tabular-nums text-cyan-300/80">
                    {`${index + 1}`.padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={cn('truncate text-sm text-slate-100', task.completed && 'text-slate-500 line-through')}>
                      {task.title}
                    </p>
                    <p className="text-[11px] text-slate-500">{formatRelativeDay(task.dueDate)}</p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => onComplete(task.id)}>
                    {task.completed ? 'Reopen' : 'Done'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => onToggle(task.id)}
                    aria-label={`Remove ${task.title} from today's focus`}
                    className="rounded-lg p-1.5 text-amber-300 transition-colors hover:bg-slate-800/70"
                  >
                    <Star className="h-3.5 w-3.5 fill-amber-300" />
                  </button>
                </motion.li>
              ))}
            </ol>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}
