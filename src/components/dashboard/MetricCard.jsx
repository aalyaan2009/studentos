import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function MetricCard({ icon: Icon, value, label, trend, tone = 'cyan', delay = 0 }) {
  const tones = {
    cyan: 'text-cyan-300 border-cyan-500/25',
    emerald: 'text-emerald-300 border-emerald-500/25',
    amber: 'text-amber-300 border-amber-500/25',
    rose: 'text-rose-300 border-rose-500/25',
    violet: 'text-violet-300 border-violet-500/25',
    blue: 'text-blue-300 border-blue-500/25',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22, ease: 'easeOut', delay }}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 backdrop-blur-md transition-colors duration-200 hover:border-slate-700"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(circle at 30% 0%, rgba(6,182,212,0.12), transparent 60%)' }}
      />
      <div className="relative flex items-start justify-between">
        <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg border bg-slate-950/60', tones[tone])}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        {trend ? <span className="text-[11px] text-slate-500">{trend}</span> : null}
      </div>
      <p className="relative mt-4 text-2xl font-semibold tracking-tight text-slate-50">{value}</p>
      <p className="relative mt-0.5 text-xs text-slate-500">{label}</p>
    </motion.div>
  )
}
