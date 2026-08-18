import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className={cn('flex flex-col items-center justify-center px-6 py-14 text-center', className)}
    >
      <div className="relative mb-5 flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-2xl border border-slate-800 bg-slate-900/70" />
        <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18),transparent_70%)]" />
        {Icon ? <Icon className="relative h-7 w-7 text-cyan-300/80" aria-hidden="true" /> : null}
      </div>
      <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      {description ? <p className="mt-1.5 max-w-sm text-sm text-slate-500">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </motion.div>
  )
}
