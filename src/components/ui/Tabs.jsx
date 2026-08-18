import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Tabs({ items, value, onChange, className, size = 'md' }) {
  return (
    <div
      role="tablist"
      className={cn('inline-flex items-center gap-1 rounded-xl border border-slate-800/80 bg-slate-900/60 p-1', className)}
    >
      {items.map((item) => {
        const active = item.value === value
        return (
          <button
            key={item.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              'relative rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70',
              size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm',
              active ? 'text-slate-50' : 'text-slate-500 hover:text-slate-300',
            )}
          >
            {active ? (
              <motion.span
                layoutId={`tab-${items.map((entry) => entry.value).join('-')}`}
                className="absolute inset-0 rounded-lg border border-cyan-500/25 bg-cyan-500/10"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className="relative flex items-center gap-1.5">
              {item.label}
              {typeof item.count === 'number' ? (
                <span className="text-[11px] text-slate-500">{item.count}</span>
              ) : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}
