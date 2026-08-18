import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { FOOTER_NAV, MOBILE_NAV, PRIMARY_NAV, SECONDARY_NAV } from '../../constants/navigation'
import { Logo } from '../ui/Logo'
import { cn } from '../../utils/cn'

export function MobileDrawer({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            type="button"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            className="relative flex h-full w-72 flex-col border-r border-slate-800 bg-slate-950 px-3 py-5"
          >
            <div className="mb-6 flex items-center justify-between px-2">
              <span className="flex items-center gap-2.5">
                <Logo />
                <span className="text-sm font-semibold tracking-tight text-slate-100">StudentOS</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-800/70 hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto">
              {[...PRIMARY_NAV, ...SECONDARY_NAV, ...FOOTER_NAV].map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors',
                        isActive
                          ? 'border border-cyan-500/25 bg-cyan-500/10 text-slate-50'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200',
                      )
                    }
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                )
              })}
            </div>
            <p className="px-3 pt-4 text-[10px] uppercase tracking-[0.16em] text-slate-600">StudentOS v1.0</p>
          </motion.nav>
        </div>
      ) : null}
    </AnimatePresence>
  )
}

export function MobileTabBar() {
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl lg:hidden"
    >
      <ul className="flex items-stretch justify-around px-2 py-1.5">
        {MOBILE_NAV.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.to} className="flex-1">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] transition-colors',
                    isActive ? 'text-cyan-300' : 'text-slate-500 hover:text-slate-300',
                  )
                }
              >
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                {item.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
