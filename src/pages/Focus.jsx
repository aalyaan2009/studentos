import { useMemo, useState } from 'react'
import { useApp } from '../context/appStore'
import { useFocusTimer } from '../hooks/useFocusTimer'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'
import { Select } from '../components/ui/Input'
import { FocusTimer } from '../components/focus/FocusTimer'
import { SessionCompleteModal } from '../components/focus/SessionCompleteModal'
import { StatTile } from '../components/analytics/StatTile'
import { formatTimestamp } from '../utils/dates'
import { focusHours, focusMinutes, sessionsInRange, studyStreak } from '../utils/analytics'
import { filterTasks } from '../hooks/useTasks'

export default function Focus() {
  const { subjects, tasks, sessions, settings, logSession } = useApp()
  const [subject, setSubject] = useState('')
  const [taskId, setTaskId] = useState('')
  const [completed, setCompleted] = useState(null)

  const activeTasks = useMemo(() => filterTasks(tasks, { status: 'active', sort: 'dueDate' }), [tasks])
  const streak = useMemo(() => studyStreak(sessions), [sessions])
  const todaySessions = useMemo(() => sessionsInRange(sessions, 1), [sessions])
  const weekSessions = useMemo(() => sessionsInRange(sessions, 7), [sessions])

  const timer = useFocusTimer({
    initialMinutes: settings.productivity.defaultFocusMinutes,
    onComplete: (minutes) => {
      const task = activeTasks.find((item) => item.id === taskId)
      logSession({ minutes, subject, taskTitle: task?.title })
      setCompleted(minutes)
    },
  })

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Deep work"
        title="Focus"
        description="Run a timed session, log the work, and build a study streak."
      />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="relative overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.10),transparent_55%)]"
          />
          <div className="relative flex flex-col items-center px-6 py-10">
            <FocusTimer timer={timer} />
            <div className="mt-8 grid w-full max-w-md gap-4 sm:grid-cols-2">
              <Select label="Subject" value={subject} onChange={(event) => setSubject(event.target.value)}>
                <option value="">No subject</option>
                {subjects.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </Select>
              <Select label="Task" value={taskId} onChange={(event) => setTaskId(event.target.value)}>
                <option value="">No task</option>
                {activeTasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <StatTile label="Streak" value={`${streak} days`} sub="Consecutive study days" />
            <StatTile label="Today" value={`${focusMinutes(todaySessions)} min`} sub={`${todaySessions.length} sessions`} tone="text-emerald-300" delay={0.05} />
            <StatTile label="This week" value={`${focusHours(weekSessions)} h`} sub={`${weekSessions.length} sessions`} tone="text-violet-300" delay={0.1} />
            <StatTile label="All time" value={`${focusHours(sessions)} h`} sub={`${sessions.length} sessions`} tone="text-slate-200" delay={0.15} />
          </div>

          <Card>
            <CardHeader title="Session history" description="Your most recent focus blocks." />
            <ul className="max-h-80 divide-y divide-slate-800/60 overflow-y-auto">
              {sessions.length === 0 ? (
                <li className="px-5 py-8 text-sm text-slate-500">No sessions logged yet.</li>
              ) : (
                [...sessions]
                  .reverse()
                  .slice(0, 12)
                  .map((session) => (
                    <li key={session.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                      <div className="min-w-0">
                        <p className="truncate text-slate-200">{session.taskTitle || session.subject || 'Focus session'}</p>
                        <p className="text-[11px] text-slate-500">{formatTimestamp(session.completedAt)}</p>
                      </div>
                      <span className="shrink-0 text-xs text-cyan-300/80">{session.minutes} min</span>
                    </li>
                  ))
              )}
            </ul>
          </Card>
        </div>
      </div>

      <SessionCompleteModal open={completed !== null} minutes={completed || 0} streak={streak} onClose={() => setCompleted(null)} />
    </div>
  )
}
