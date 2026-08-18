import { CheckCircle2, FileText, Timer } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { formatTimestamp } from '../../utils/dates'

const ICONS = { task: CheckCircle2, session: Timer, note: FileText }

export function RecentActivity({ items }) {
  return (
    <Card>
      <CardHeader title="Recent Activity" description="The last things you worked on." />
      <ul className="divide-y divide-slate-800/60">
        {items.length === 0 ? (
          <li className="px-5 py-8 text-sm text-slate-500">No activity recorded yet.</li>
        ) : (
          items.map((item) => {
            const Icon = ICONS[item.type] || CheckCircle2
            return (
              <li key={item.id} className="flex items-center gap-3 px-5 py-3">
                <Icon className="h-4 w-4 shrink-0 text-cyan-300/70" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-sm text-slate-300">{item.label}</span>
                <span className="shrink-0 text-[11px] text-slate-600">{formatTimestamp(item.at)}</span>
              </li>
            )
          })
        )}
      </ul>
    </Card>
  )
}
