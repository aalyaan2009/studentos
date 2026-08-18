import { useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { useApp } from '../../context/appStore'
import { Button } from '../ui/Button'
import { toISODate } from '../../utils/dates'

export function QuickAddBar({ defaultSubject = '' }) {
  const { addTask } = useApp()
  const [value, setValue] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!value.trim()) return
    addTask({ title: value, subject: defaultSubject, priority: 'medium', dueDate: toISODate() })
    setValue('')
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-2 backdrop-blur-md sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-2 px-2">
        <Sparkles className="h-4 w-4 shrink-0 text-cyan-400/70" aria-hidden="true" />
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Add a new task..."
          aria-label="Quick add a task"
          className="w-full bg-transparent py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
        />
      </div>
      <Button type="submit" disabled={!value.trim()} className="shrink-0">
        <Plus className="h-4 w-4" />
        Add Task
      </Button>
    </form>
  )
}
