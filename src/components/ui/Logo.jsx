import { cn } from '../../utils/cn'

export function Logo({ className, size = 32 }) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl border border-cyan-500/30 bg-slate-900',
        'shadow-[0_0_24px_rgba(6,182,212,0.18)]',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} aria-hidden="true" fill="none">
        <defs>
          <linearGradient id="studentos-logo" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
        <path
          d="M17.5 6.5c-1.6-1.6-4.2-1.9-6-.6-1.9 1.4-1.7 4 .4 5l3.4 1.6c2.1 1 2.3 3.6.4 5-1.8 1.3-4.4 1-6-.6"
          stroke="url(#studentos-logo)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="10" stroke="url(#studentos-logo)" strokeOpacity="0.25" strokeWidth="1.2" />
      </svg>
    </span>
  )
}
