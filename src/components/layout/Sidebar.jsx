import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { FOOTER_NAV, PRIMARY_NAV, SECONDARY_NAV } from '../../constants/navigation'
import { Logo } from '../ui/Logo'
import { Tooltip } from '../ui/Tooltip'
import { Avatar } from '../ui/Avatar'
import { cn } from '../../utils/cn'

function NavItem({ item, collapsed, badge }) {
  const Icon = item.icon
  return (
    <Tooltip label={collapsed ? item.label : ''} side="right" className="w-full">
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          cn(
            'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70',
            isActive ? 'text-slate-50' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200',
            collapsed && 'justify-center px-0',
          )
        }
      >
        {({ isActive }) => (
          <>
            {isActive ? (
              <motion.span
                layoutId="sidebar-active"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                className="absolute inset-0 rounded-xl border border-cyan-500/25 bg-cyan-500/10 shadow-[0_0_24px_rgba(6,182,212,0.12)]"
              />
            ) : null}
            <Icon className={cn('relative h-4 w-4 shrink-0', isActive && 'text-cyan-300')} aria-hidden="true" />
            {collapsed ? null : (
              <>
                <span className="relative flex-1 truncate">{item.label}</span>
                {badge ? (
                  <span className="relative rounded-full bg-rose-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-rose-300">
                    {badge}
                  </span>
                ) : item.shortcut ? (
                  <span className="relative text-[10px] text-slate-600 group-hover:text-slate-500">⌘{item.shortcut}</span>
                ) : null}
              </>
            )}
          </>
        )}
      </NavLink>
    </Tooltip>
  )
}

export function Sidebar({ collapsed, onToggleCollapse, badges = {}, displayName }) {
  return (
    <aside
      className={cn(
        'hidden shrink-0 flex-col border-r border-slate-800/70 bg-slate-950/70 backdrop-blur-xl transition-[width] duration-300 lg:flex',
        collapsed ? 'w-[76px]' : 'w-64',
      )}
    >
      <div className={cn('flex items-center gap-3 px-4 py-5', collapsed && 'justify-center px-0')}>
        <Logo />
        {collapsed ? null : (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-slate-100">StudentOS</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-400/70">Academic workspace</p>
          </div>
        )}
      </div>

      <nav aria-label="Primary" className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        <div className="space-y-1">
          {!collapsed ? (
            <p className="px-3 pb-1 text-[10px] uppercase tracking-[0.16em] text-slate-600">Workspace</p>
          ) : null}
          {PRIMARY_NAV.map((item) => (
            <NavItem key={item.to} item={item} collapsed={collapsed} badge={badges[item.to]} />
          ))}
        </div>
        <div className="space-y-1">
          {!collapsed ? (
            <p className="px-3 pb-1 text-[10px] uppercase tracking-[0.16em] text-slate-600">Planning</p>
          ) : null}
          {SECONDARY_NAV.map((item) => (
            <NavItem key={item.to} item={item} collapsed={collapsed} badge={badges[item.to]} />
          ))}
        </div>
      </nav>

      <div className="space-y-1 border-t border-slate-800/70 px-3 py-3">
        {FOOTER_NAV.map((item) => (
          <NavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
        <div className={cn('flex items-center gap-3 rounded-xl px-3 py-2', collapsed && 'justify-center px-0')}>
          <Avatar name={displayName} size="sm" />
          {collapsed ? null : (
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-slate-200">{displayName}</p>
              <p className="text-[10px] text-slate-600">Student</p>
            </div>
          )}
        </div>
        <div className={cn('flex items-center justify-between gap-2 px-3 pt-1', collapsed && 'flex-col px-0')}>
          {collapsed ? null : (
            <span className="rounded-full border border-cyan-500/25 bg-cyan-500/5 px-2 py-0.5 text-[10px] text-cyan-300/90">
              StudentOS v1.0
            </span>
          )}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800/70 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </aside>
  )
}
