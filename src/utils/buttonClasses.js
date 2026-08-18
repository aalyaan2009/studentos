import { cn } from './cn'

const VARIANTS = {
  primary:
    'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] disabled:bg-cyan-500/40',
  secondary: 'border border-slate-700/80 bg-slate-900/70 text-slate-200 hover:border-slate-600 hover:text-white',
  ghost: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100',
  danger: 'border border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20',
  subtle: 'bg-slate-800/60 text-slate-200 hover:bg-slate-800',
}

const SIZES = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-sm gap-2',
  icon: 'h-9 w-9 justify-center',
}

export function buttonClasses({ variant = 'primary', size = 'md', className } = {}) {
  return cn(
    'inline-flex items-center rounded-xl font-medium transition-colors duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
    'disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    className,
  )
}
