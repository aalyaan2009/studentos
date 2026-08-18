import { useId } from 'react'
import { cn } from '../../utils/cn'

const FIELD =
  'w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 transition-colors duration-200 focus:border-cyan-500/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/20'

export function Field({ label, hint, children, id }) {
  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={id} className="block text-xs font-medium text-slate-400">
          {label}
        </label>
      ) : null}
      {children}
      {hint ? <p className="text-[11px] text-slate-600">{hint}</p> : null}
    </div>
  )
}

export function Input({ label, hint, className, id, ...props }) {
  const generatedId = useId()
  const inputId = id || generatedId
  return (
    <Field label={label} hint={hint} id={inputId}>
      <input id={inputId} className={cn(FIELD, className)} {...props} />
    </Field>
  )
}

export function Textarea({ label, hint, className, id, rows = 4, ...props }) {
  const generatedId = useId()
  const inputId = id || generatedId
  return (
    <Field label={label} hint={hint} id={inputId}>
      <textarea id={inputId} rows={rows} className={cn(FIELD, 'resize-none', className)} {...props} />
    </Field>
  )
}

export function Select({ label, hint, className, id, options = [], children, ...props }) {
  const generatedId = useId()
  const inputId = id || generatedId
  return (
    <Field label={label} hint={hint} id={inputId}>
      <select id={inputId} className={cn(FIELD, 'appearance-none pr-8', className)} {...props}>
        {children ||
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </Field>
  )
}
