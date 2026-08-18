import { cn } from '../../utils/cn'

const TONES = {
  default: 'border-slate-700/70 bg-slate-800/60 text-slate-300',
  cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  danger: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
  violet: 'border-violet-500/30 bg-violet-500/10 text-violet-300',
}

export function Badge({ tone = 'default', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
        TONES[tone] || TONES.default,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function Dot({ className }) {
  return <span className={cn('h-1.5 w-1.5 rounded-full', className)} aria-hidden="true" />
}
