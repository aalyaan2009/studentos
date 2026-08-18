import { Lightbulb } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { cn } from '../../utils/cn'

const TONES = {
  success: 'border-emerald-500/25 bg-emerald-500/5 text-emerald-200',
  warning: 'border-amber-500/25 bg-amber-500/5 text-amber-200',
  info: 'border-cyan-500/25 bg-cyan-500/5 text-cyan-100',
}

export function InsightCard({ insights }) {
  return (
    <Card>
      <CardHeader title="Insights" description="Calculated from your workspace data." />
      <ul className="space-y-2 p-4">
        {insights.length === 0 ? (
          <li className="px-1 py-4 text-sm text-slate-500">Complete a few tasks to unlock insights.</li>
        ) : (
          insights.map((insight) => (
            <li
              key={insight.id}
              className={cn('flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-xs', TONES[insight.tone] || TONES.info)}
            >
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{insight.text}</span>
            </li>
          ))
        )}
      </ul>
    </Card>
  )
}
