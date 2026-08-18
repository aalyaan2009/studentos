import { Pause, Play, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { ProgressRing } from '../ui/Progress'
import { FOCUS_PRESETS } from '../../constants/theme'
import { formatClock } from '../../utils/dates'
import { cn } from '../../utils/cn'

export function FocusTimer({ timer, compact = false, onPresetChange }) {
  const { remaining, running, progress, durationMinutes, start, pause, reset } = timer
  const size = compact ? 168 : 240

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {running ? (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18),transparent_65%)]"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : null}
        <ProgressRing
          value={progress * 100}
          size={size}
          stroke={compact ? 8 : 10}
          label={`Focus session ${Math.round(progress * 100)}% complete`}
        >
          <span className={cn('font-semibold tabular-nums tracking-tight text-slate-50', compact ? 'text-3xl' : 'text-5xl')}>
            {formatClock(remaining)}
          </span>
          <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
            {running ? 'Focusing' : 'Ready'}
          </span>
        </ProgressRing>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {running ? (
          <Button variant="secondary" onClick={pause}>
            <Pause className="h-4 w-4" />
            Pause
          </Button>
        ) : (
          <Button onClick={start}>
            <Play className="h-4 w-4" />
            {progress > 0 ? 'Resume' : 'Start focus'}
          </Button>
        )}
        <Button variant="ghost" onClick={() => reset(durationMinutes)} aria-label="Reset timer">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {FOCUS_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              reset(preset)
              onPresetChange?.(preset)
            }}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70',
              durationMinutes === preset
                ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200',
            )}
          >
            {preset} min
          </button>
        ))}
        <label className="flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-1.5 text-xs text-slate-400">
          <span>Custom</span>
          <input
            type="number"
            min="1"
            max="240"
            value={durationMinutes}
            onChange={(event) => {
              const minutes = Math.max(1, Math.min(240, Number(event.target.value) || 1))
              reset(minutes)
              onPresetChange?.(minutes)
            }}
            aria-label="Custom focus duration in minutes"
            className="w-14 rounded-md border border-slate-800 bg-slate-950/80 px-1.5 py-0.5 text-center text-slate-200 focus:border-cyan-500/70 focus:outline-none"
          />
        </label>
      </div>
    </div>
  )
}
