import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import { useApp } from '../../context/appStore'
import { cn } from '../../utils/cn'

const TONES = {
  success: { icon: CheckCircle2, className: 'border-emerald-500/30 text-emerald-300' },
  warning: { icon: TriangleAlert, className: 'border-amber-500/30 text-amber-300' },
  danger: { icon: TriangleAlert, className: 'border-rose-500/30 text-rose-300' },
  default: { icon: Info, className: 'border-slate-700/80 text-cyan-300' },
}

function ToastItem({ toast, onDismiss }) {
  const tone = TONES[toast.tone] || TONES.default
  const Icon = tone.icon

  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(toast.id), 3200)
    return () => window.clearTimeout(timer)
  }, [onDismiss, toast.id])

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 24, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'pointer-events-auto flex w-72 items-start gap-3 rounded-xl border bg-slate-900/95 px-3.5 py-3 shadow-2xl backdrop-blur-xl',
        tone.className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-100">{toast.title}</p>
        {toast.description ? <p className="mt-0.5 truncate text-xs text-slate-400">{toast.description}</p> : null}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="rounded-md p-0.5 text-slate-500 transition-colors hover:text-slate-200"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.li>
  )
}

export function ToastViewport() {
  const { toasts, dismissToast } = useApp()
  return (
    <ul
      aria-live="polite"
      className="pointer-events-none fixed bottom-20 right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </AnimatePresence>
    </ul>
  )
}
