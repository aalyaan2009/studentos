import { MotionCard } from '../ui/Card'
import { cn } from '../../utils/cn'

export function StatTile({ label, value, sub, tone = 'text-cyan-300', delay = 0 }) {
  return (
    <MotionCard delay={delay} className="p-5">
      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className={cn('mt-2 text-2xl font-semibold tracking-tight', tone)}>{value}</p>
      {sub ? <p className="mt-1 text-xs text-slate-500">{sub}</p> : null}
    </MotionCard>
  )
}
