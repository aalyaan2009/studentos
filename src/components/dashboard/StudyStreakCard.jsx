import { Flame } from 'lucide-react'
import { Card, CardHeader } from '../ui/Card'
import { Heatmap } from '../analytics/Charts'

export function StudyStreakCard({ streak, data }) {
  return (
    <Card>
      <CardHeader
        title="Study Streak"
        description="Your last five weeks of focus sessions."
        action={
          <span className="flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-300">
            <Flame className="h-3.5 w-3.5" aria-hidden="true" />
            {streak} day streak
          </span>
        }
      />
      <div className="overflow-x-auto p-5">
        <Heatmap data={data} />
      </div>
    </Card>
  )
}
