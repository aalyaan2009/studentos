import { cn } from '../../utils/cn'

export function Skeleton({ className }) {
  return <div className={cn('shimmer rounded-xl bg-slate-800/60', className)} aria-hidden="true" />
}

export function SkeletonCard({ lines = 3, className }) {
  return (
    <div className={cn('rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5', className)}>
      <Skeleton className="h-4 w-32" />
      <div className="mt-4 space-y-2.5">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} className={cn('h-3', index % 2 === 0 ? 'w-full' : 'w-4/5')} />
        ))}
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 4 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} lines={2} />
      ))}
    </div>
  )
}
