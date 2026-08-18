import { motion } from 'framer-motion'
import { colorMeta } from '../../constants/theme'
import { cn } from '../../utils/cn'

export function BarChart({ data, unit = 'min', height = 168 }) {
  const max = Math.max(...data.map((entry) => entry.value), 1)
  return (
    <div className="flex items-stretch gap-2" style={{ height }} role="img" aria-label="Study minutes by day">
      {data.map((entry, index) => (
        <div key={entry.label + index} className="flex h-full flex-1 flex-col items-center gap-2">
          <div className="flex w-full min-h-0 flex-1 items-end">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(4, (entry.value / max) * 100)}%` }}
              transition={{ duration: 0.5, delay: index * 0.04, ease: 'easeOut' }}
              className={cn(
                'w-full rounded-t-md bg-gradient-to-t from-cyan-500/30 to-cyan-400/80',
                entry.value === 0 && 'from-slate-800/60 to-slate-800/60',
              )}
              title={`${entry.value} ${unit}`}
            />
          </div>
          <span className="text-[10px] text-slate-500">{entry.label}</span>
        </div>
      ))}
    </div>
  )
}

export function DonutChart({ data, size = 168 }) {
  const total = data.reduce((sum, entry) => sum + entry.value, 0)
  const radius = size / 2 - 12
  const circumference = 2 * Math.PI * radius
  let offset = 0

  if (total === 0) {
    return <p className="py-8 text-center text-sm text-slate-500">No data to chart yet.</p>
  }

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label="Task distribution by subject">
        {data.map((entry) => {
          const fraction = entry.value / total
          const dash = fraction * circumference
          const circle = (
            <motion.circle
              key={entry.id}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth="14"
              stroke="currentColor"
              className={colorMeta(entry.color).ring}
              strokeDasharray={`${dash} ${circumference - dash}`}
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={{ strokeDashoffset: -offset, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )
          offset += dash
          return circle
        })}
      </svg>
      <ul className="space-y-2">
        {data.map((entry) => (
          <li key={entry.id} className="flex items-center gap-2 text-xs text-slate-400">
            <span className={cn('h-2 w-2 rounded-full', colorMeta(entry.color).dot)} aria-hidden="true" />
            <span className="text-slate-300">{entry.name}</span>
            <span className="text-slate-500">{Math.round((entry.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Heatmap({ data }) {
  const max = Math.max(...data.map((entry) => entry.minutes), 1)
  const level = (minutes) => {
    if (minutes === 0) return 'bg-slate-800/60'
    const ratio = minutes / max
    if (ratio > 0.75) return 'bg-cyan-400'
    if (ratio > 0.5) return 'bg-cyan-500/80'
    if (ratio > 0.25) return 'bg-cyan-500/50'
    return 'bg-cyan-500/25'
  }
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1.5" role="img" aria-label="Study activity over the last weeks">
      {data.map((entry) => (
        <span
          key={entry.date}
          title={`${entry.date}: ${entry.minutes} min`}
          className={cn('h-3.5 w-3.5 rounded-[4px] transition-colors', level(entry.minutes))}
        />
      ))}
    </div>
  )
}
