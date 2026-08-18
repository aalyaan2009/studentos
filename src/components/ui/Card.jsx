import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Card({ className, interactive = false, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md',
        'shadow-[0_0_40px_rgba(6,182,212,0.04)]',
        interactive && 'transition-colors duration-200 hover:border-slate-700',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function MotionCard({ className, delay = 0, children, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut', delay }}
      className={cn(
        'rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md',
        'shadow-[0_0_40px_rgba(6,182,212,0.04)]',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ title, description, action, className }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 border-b border-slate-800/70 px-5 py-4', className)}>
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-slate-100">{title}</h2>
        {description ? <p className="mt-0.5 text-xs text-slate-500">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}
