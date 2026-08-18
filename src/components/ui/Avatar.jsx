import { cn } from '../../utils/cn'

export function Avatar({ name = 'Student', size = 'md', className }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-cyan-500/30 bg-gradient-to-br from-slate-800 to-slate-900 font-semibold text-cyan-300',
        size === 'sm' ? 'h-7 w-7 text-[11px]' : 'h-9 w-9 text-xs',
        className,
      )}
    >
      {initials || 'S'}
    </span>
  )
}
