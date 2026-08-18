import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Tooltip({ label, side = 'right', children, className }) {
  const [open, setOpen] = useState(false)
  if (!label) return children
  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open ? (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, x: side === 'right' ? -4 : 0, y: side === 'top' ? 4 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            className={cn(
              'pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-slate-700/80 bg-slate-900 px-2 py-1 text-[11px] font-medium text-slate-200 shadow-xl',
              side === 'right' && 'left-full top-1/2 ml-2 -translate-y-1/2',
              side === 'top' && 'bottom-full left-1/2 mb-2 -translate-x-1/2',
            )}
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  )
}
