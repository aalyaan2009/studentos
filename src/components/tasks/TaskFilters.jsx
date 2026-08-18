import { Search } from 'lucide-react'
import { Tabs } from '../ui/Tabs'
import { PRIORITIES } from '../../constants/theme'

const SORTS = [
  { value: 'dueDate', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
  { value: 'created', label: 'Recently added' },
  { value: 'title', label: 'Title' },
]

const selectClass =
  'rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-300 transition-colors focus:border-cyan-500/70 focus:outline-none'

export function TaskFilters({ filters, onChange, counts, subjects }) {
  const update = (patch) => onChange({ ...filters, ...patch })

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <Tabs
        value={filters.status}
        onChange={(status) => update({ status })}
        items={[
          { value: 'all', label: 'All', count: counts.all },
          { value: 'active', label: 'Active', count: counts.active },
          { value: 'completed', label: 'Completed', count: counts.completed },
          { value: 'overdue', label: 'Overdue', count: counts.overdue },
        ]}
      />
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />
          <input
            value={filters.query}
            onChange={(event) => update({ query: event.target.value })}
            placeholder="Search tasks"
            aria-label="Search tasks"
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/70 focus:outline-none sm:w-52"
          />
        </div>
        <select
          className={selectClass}
          aria-label="Filter by subject"
          value={filters.subject}
          onChange={(event) => update({ subject: event.target.value })}
        >
          <option value="all">All subjects</option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          aria-label="Filter by priority"
          value={filters.priority}
          onChange={(event) => update({ priority: event.target.value })}
        >
          <option value="all">Any priority</option>
          {PRIORITIES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          className={selectClass}
          aria-label="Sort tasks"
          value={filters.sort}
          onChange={(event) => update({ sort: event.target.value })}
        >
          {SORTS.map((item) => (
            <option key={item.value} value={item.value}>
              Sort: {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
