import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { monthMatrix, toISODate } from '../../utils/dates'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function CalendarGrid({ year, month, eventsByDate, selectedDate, onSelect }) {
  const days = monthMatrix(year, month)
  const today = toISODate()

  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5 border-b border-slate-800/70 pb-2 text-center text-[11px] uppercase tracking-wider text-slate-600">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1.5">
        {days.map((day) => {
          const key = toISODate(day)
          const events = eventsByDate.get(key) || []
          const inMonth = day.getMonth() === month
          return (
            <motion.button
              key={key}
              type="button"
              whileHover={{ y: -1 }}
              onClick={() => onSelect(key)}
              aria-label={`${key}, ${events.length} items`}
              aria-pressed={selectedDate === key}
              className={cn(
                'flex min-h-[68px] flex-col items-start rounded-xl border p-2 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70',
                inMonth ? 'border-slate-800/80 bg-slate-950/40' : 'border-transparent bg-transparent opacity-40',
                selectedDate === key && 'border-cyan-500/50 bg-cyan-500/10',
              )}
            >
              <span className={cn('text-xs', key === today ? 'font-semibold text-cyan-300' : 'text-slate-400')}>
                {day.getDate()}
              </span>
              <span className="mt-auto flex flex-wrap gap-1">
                {events.slice(0, 3).map((event) => (
                  <span
                    key={event.id}
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      event.type === 'exam' ? 'bg-rose-400' : event.type === 'session' ? 'bg-emerald-400' : 'bg-cyan-400',
                    )}
                    aria-hidden="true"
                  />
                ))}
                {events.length > 3 ? <span className="text-[9px] text-slate-500">+{events.length - 3}</span> : null}
              </span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
