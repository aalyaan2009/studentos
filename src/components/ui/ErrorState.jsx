import { AlertTriangle } from 'lucide-react'
import { Button } from './Button'

export function ErrorState({
  title = 'Something went wrong.',
  description = 'Try refreshing this section. Your local data has not been changed.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/5 px-6 py-12 text-center">
      <AlertTriangle className="h-6 w-6 text-rose-400" aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold text-slate-100">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-400">{description}</p>
      {onRetry ? (
        <Button variant="secondary" size="sm" className="mt-5" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  )
}
