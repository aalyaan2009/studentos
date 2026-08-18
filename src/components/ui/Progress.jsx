import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function ProgressBar({ value, tone = 'cyan', className, label }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)))
  const tones = {
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    rose: 'bg-rose-400',
    violet: 'bg-violet-400',
    blue: 'bg-blue-400',
  }
  return (
    <div
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn('h-full rounded-full', tones[tone] || tones.cyan)}
      />
    </div>
  )
}

export function ProgressRing({
  value,
  size = 72,
  stroke = 6,
  className,
  trackClassName = 'text-slate-800',
  children,
  label,
}) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={label || `${Math.round(clamped)}%`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          className={trackClassName}
          stroke="currentColor"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeLinecap="round"
          className={cn('text-cyan-400', className)}
          stroke="currentColor"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (clamped / 100) * circumference }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}
