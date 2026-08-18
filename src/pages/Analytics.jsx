import { useMemo, useState } from 'react'
import { useApp } from '../context/appStore'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'
import { Tabs } from '../components/ui/Tabs'
import { StatTile } from '../components/analytics/StatTile'
import { BarChart, DonutChart, Heatmap } from '../components/analytics/Charts'
import { ProgressBar } from '../components/ui/Progress'
import {
  focusHours,
  heatmap,
  sessionsInRange,
  subjectDistribution,
  taskMetrics,
  tasksCompletedInRange,
  weeklyStudySeries,
} from '../utils/analytics'

const RANGES = [
  { value: 7, label: 'This week' },
  { value: 30, label: 'This month' },
  { value: 120, label: 'Semester' },
]

export default function Analytics() {
  const { tasks, sessions, subjects, exams } = useApp()
  const [range, setRange] = useState(7)

  const rangeSessions = useMemo(() => sessionsInRange(sessions, range), [range, sessions])
  const rangeCompleted = useMemo(() => tasksCompletedInRange(tasks, range), [range, tasks])
  const metrics = useMemo(() => taskMetrics(tasks), [tasks])
  const distribution = useMemo(() => subjectDistribution(tasks, subjects), [subjects, tasks])
  const weekly = useMemo(() => weeklyStudySeries(sessions), [sessions])
  const workload = useMemo(
    () =>
      subjects
        .map((subject) => {
          const subjectTasks = tasks.filter((task) => task.subject === subject.name)
          const done = subjectTasks.filter((task) => task.completed).length
          return {
            ...subject,
            total: subjectTasks.length,
            done,
            rate: subjectTasks.length === 0 ? 0 : Math.round((done / subjectTasks.length) * 100),
            exams: exams.filter((exam) => exam.subject === subject.name && !exam.completed).length,
          }
        })
        .sort((a, b) => b.total - a.total),
    [exams, subjects, tasks],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Productivity"
        title="Analytics"
        description="How your study time and workload are actually distributed."
        actions={<Tabs value={range} onChange={setRange} items={RANGES} size="sm" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Study hours" value={`${focusHours(rangeSessions)} h`} sub={`${rangeSessions.length} focus sessions`} />
        <StatTile label="Tasks completed" value={rangeCompleted.length} sub="in selected range" tone="text-emerald-300" delay={0.05} />
        <StatTile label="Completion rate" value={`${metrics.completionRate}%`} sub={`${metrics.completed} of ${metrics.total} tasks`} tone="text-violet-300" delay={0.1} />
        <StatTile label="Open workload" value={metrics.active} sub={`${metrics.overdue} overdue`} tone="text-amber-300" delay={0.15} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="Your Week" description="Focus minutes per day." />
          <div className="p-5">
            <BarChart data={weekly} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Subject distribution" description="Share of tasks per subject." />
          <div className="p-5">
            <DonutChart data={distribution} />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader title="Academic workload" description="Completion rate by subject." />
          <ul className="space-y-4 p-5">
            {workload.length === 0 ? (
              <li className="text-sm text-slate-500">Add subjects to see workload analysis.</li>
            ) : (
              workload.map((subject) => (
                <li key={subject.id}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-slate-300">{subject.name}</span>
                    <span className="text-slate-500">
                      {subject.done}/{subject.total} tasks · {subject.exams} exams
                    </span>
                  </div>
                  <ProgressBar value={subject.rate} tone={subject.color} label={`${subject.name} completion`} />
                </li>
              ))
            )}
          </ul>
        </Card>
        <Card>
          <CardHeader title="Consistency" description="Focus activity over the last 5 weeks." />
          <div className="overflow-x-auto p-5">
            <Heatmap data={heatmap(sessions)} />
          </div>
        </Card>
      </div>
    </div>
  )
}
