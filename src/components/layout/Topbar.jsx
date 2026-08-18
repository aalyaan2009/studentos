import { useState } from 'react'
import { Bell, Menu, Plus, Search } from 'lucide-react'
import { useApp } from '../../context/appStore'
import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'
import { Logo } from '../ui/Logo'
import { NotificationPanel } from './NotificationPanel'

export function Topbar({ onOpenCommand, onOpenTask, onOpenMobileNav }) {
  const { notifications, settings } = useApp()
  const [panelOpen, setPanelOpen] = useState(false)
  const unread = notifications.filter((item) => !item.read).length

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="flex items-center gap-2 lg:hidden">
          <Logo size={28} />
          <span className="text-sm font-semibold tracking-tight text-slate-100">StudentOS</span>
        </span>

        <button
          type="button"
          onClick={onOpenCommand}
          className="ml-auto hidden h-10 w-full max-w-md items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 text-sm text-slate-500 transition-colors hover:border-slate-700 hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 sm:flex lg:mx-auto"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span className="flex-1 text-left">Search StudentOS...</span>
          <kbd className="rounded-md border border-slate-700 bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-400">
            ⌘K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={onOpenCommand}
            aria-label="Search StudentOS"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100 sm:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setPanelOpen((current) => !current)}
              aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
              aria-expanded={panelOpen}
              className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 ? (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-semibold text-white">
                  {unread}
                </span>
              ) : null}
            </button>
            <NotificationPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
          </div>
          <Button size="sm" onClick={onOpenTask} className="hidden sm:inline-flex">
            <Plus className="h-4 w-4" />
            Quick Add
          </Button>
          <Button size="icon" variant="ghost" onClick={onOpenTask} aria-label="Add task" className="sm:hidden">
            <Plus className="h-4 w-4" />
          </Button>
          <Avatar name={settings.displayName} />
        </div>
      </div>
    </header>
  )
}
