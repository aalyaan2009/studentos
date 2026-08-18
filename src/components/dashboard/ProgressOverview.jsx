import { Card, CardHeader } from '../ui/Card'
import { ProgressRing } from '../ui/Progress'

export function ProgressOverview({ completionRate, completed, total, studyHours, upcomingExams, streak }) {
  const stats = [
    { label: 'Tasks completed', value: `${completed}/${total}` },
    { label: 'Study hours', value: `${studyHours}h` },
    { label: 'Upcoming exams', value: upcomingExams },
    { label: 'Current streak', value: `${streak}d` },
  ]
  return (
    <Card>
      <CardHeader title="Academic Progress" description="Where you stand right now." />
      <div className="flex items-center gap-6 p-5">
        <ProgressRing value={completionRate} size={104} stroke={8} label={`${completionRate}% of tasks completed`}>
          <span className="text-xl font-semibold text-slate-50">{completionRate}%</span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500">Done</span>
        </ProgressRing>
        <dl className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[11px] text-slate-500">{stat.label}</dt>
              <dd className="text-sm font-semibold text-slate-100">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Card>
  )
}
