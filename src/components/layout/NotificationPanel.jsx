import { AnimatePresence, motion } from 'framer-motion'
import { BellOff, CheckCheck } from 'lucide-react'
import { useApp } from '../../context/appStore'
import { formatTimestamp } from '../../utils/dates'
import { cn } from '../../utils/cn'

const TONES = {
  info: 'border-cyan-500/30 text-cyan-300',
  success: 'border-emerald-500/30 text-emerald-300',
  warning: 'border-amber-500/30 text-amber-300',
  urgent: 'border-rose-500/30 text-rose-300',
}

export function NotificationPanel({ open, onClose }) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp()

  return (
    <AnimatePresence>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            className="fixed inset-0 z-30 cursor-default"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-12 z-40 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-100">Notifications</h2>
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="flex items-center gap-1.5 text-[11px] text-slate-500 transition-colors hover:text-cyan-300"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <li className="flex flex-col items-center gap-2 px-4 py-10 text-center text-sm text-slate-500">
                  <BellOff className="h-5 w-5 text-slate-600" aria-hidden="true" />
                  You are all caught up.
                </li>
              ) : (
                notifications.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => markNotificationRead(item.id)}
                      className="flex w-full gap-3 border-b border-slate-800/60 px-4 py-3 text-left transition-colors hover:bg-slate-800/40"
                    >
                      <span
                        className={cn(
                          'mt-1.5 h-2 w-2 shrink-0 rounded-full border',
                          TONES[item.tone] || TONES.info,
                          item.read ? 'bg-transparent' : 'bg-current',
                        )}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className={cn('block text-sm', item.read ? 'text-slate-400' : 'font-medium text-slate-100')}>
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">{item.body}</span>
                        <span className="mt-1 block text-[10px] text-slate-600">{formatTimestamp(item.createdAt)}</span>
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  )
}
