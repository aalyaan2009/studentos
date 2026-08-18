import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlarmClock, CheckCircle2, Clock, GraduationCap, ListChecks, TriangleAlert } from 'lucide-react'
import { useApp } from '../context/appStore'
import { useUi } from '../context/uiStore'
import { useExams } from '../hooks/useExams'
import { useFocusTimer } from '../hooks/useFocusTimer'
import { HeroPanel } from '../components/dashboard/HeroPanel'
import { MetricCard } from '../components/dashboard/MetricCard'
import { TodaysFocus } from '../components/dashboard/TodaysFocus'
import { QuickActions } from '../components/dashboard/QuickActions'
import { StudyStreakCard } from '../components/dashboard/StudyStreakCard'
import { InsightCard } from '../components/dashboard/InsightCard'
import { ProgressOverview } from '../components/dashboard/ProgressOverview'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { ExamTimeline } from '../components/exams/ExamTimeline'
import { TaskList } from '../components/tasks/TaskList'
import { QuickAddBar } from '../components/tasks/QuickAddBar'
import { FocusTimer } from '../components/focus/FocusTimer'
import { SessionCompleteModal } from '../components/focus/SessionCompleteModal'
import { Card, CardHeader } from '../components/ui/Card'
import { SkeletonCard, SkeletonGrid } from '../components/ui/Skeleton'
import { Button } from '../components/ui/Button'
import { filterTasks } from '../hooks/useTasks'
import {
  focusHours,
  heatmap,
  productivityInsights,
  sessionsInRange,
  studyStreak,
  taskMetrics,
  tasksCompletedInRange,
} from '../utils/analytics'

export default function Dashboard() {
  const { tasks, exams, notes, sessions, settings, priorityIds, toggleTask, togglePriority, deleteTask, logSession } =
    useApp()
  const { openTaskModal } = useUi()
  const { upcoming } = useExams()
  const [loading, setLoading] = useState(true)
  const [completedSession, setCompletedSession] = useState(null)

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 420)
    return () => window.clearTimeout(id)
  }, [])

  const timer = useFocusTimer({
    initialMinutes: settings.productivity.defaultFocusMinutes,
    onComplete: (minutes) => {
      logSession({ minutes, subject: '' })
      setCompletedSession(minutes)
    },
  })

  const metrics = useMemo(() => taskMetrics(tasks), [tasks])
  const weeklyHours = useMemo(() => focusHours(sessionsInRange(sessions, 7)), [sessions])
  const streak = useMemo(() => studyStreak(sessions), [sessions])
  const insights = useMemo(() => productivityInsights({ tasks, sessions, exams }), [exams, sessions, tasks])
  const completedThisWeek = useMemo(() => tasksCompletedInRange(tasks, 7).length, [tasks])
  const priorities = priorityIds.map((id) => tasks.find((task) => task.id === id)).filter(Boolean)
  const upcomingTasks = useMemo(() => filterTasks(tasks, { status: 'active', sort: 'dueDate' }).slice(0, 5), [tasks])

  const activity = useMemo(() => {
    const entries = [
      ...tasks
        .filter((task) => task.completedAt)
        .map((task) => ({ id: `a-${task.id}`, type: 'task', label: `Completed “${task.title}”`, at: task.completedAt })),
      ...sessions
        .slice(-6)
        .map((session) => ({
          id: `a-${session.id}`,
          type: 'session',
          label: `${session.minutes} minute focus session`,
          at: session.completedAt,
        })),
      ...notes.map((note) => ({ id: `a-${note.id}`, type: 'note', label: `Updated note “${note.title}”`, at: note.updatedAt })),
    ]
    return entries.sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 6)
  }, [notes, sessions, tasks])

  return (
    <div className="space-y-6">
      <HeroPanel name={settings.displayName} onAddTask={() => openTaskModal()} />

      {loading ? (
        <SkeletonGrid count={6} />
      ) : (
        <section aria-label="Key metrics" className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
          <MetricCard icon={ListChecks} value={metrics.total} label="Total Tasks" trend={`${metrics.active} active`} />
          <MetricCard
            icon={CheckCircle2}
            value={metrics.completed}
            label="Completed"
            tone="emerald"
            trend={`${completedThisWeek} this week`}
            delay={0.04}
          />
          <MetricCard icon={AlarmClock} value={metrics.dueSoon} label="Due Soon" tone="amber" trend="next 3 days" delay={0.08} />
          <MetricCard icon={TriangleAlert} value={metrics.overdue} label="Overdue" tone="rose" trend="needs attention" delay={0.12} />
          <MetricCard icon={Clock} value={`${weeklyHours}h`} label="Study Hours" tone="violet" trend="last 7 days" delay={0.16} />
          <MetricCard icon={GraduationCap} value={upcoming.length} label="Upcoming Exams" tone="blue" trend={upcoming[0] ? `${upcoming[0].daysRemaining}d away` : 'none scheduled'} delay={0.2} />
        </section>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <TodaysFocus
            priorities={priorities}
            candidates={upcomingTasks}
            onToggle={togglePriority}
            onComplete={toggleTask}
          />

          <Card>
            <CardHeader
              title="Due Soon"
              description="The next things on your list."
              action={
                <Link to="/tasks" className="text-[11px] text-cyan-300/80 transition-colors hover:text-cyan-200">
                  View all
                </Link>
              }
            />
            <div className="space-y-4 p-4">
              <QuickAddBar />
              {loading ? (
                <SkeletonCard lines={4} />
              ) : (
                <TaskList
                  tasks={upcomingTasks}
                  onToggle={toggleTask}
                  onEdit={openTaskModal}
                  onDelete={(task) => deleteTask(task.id)}
                  onTogglePriority={togglePriority}
                  priorityIds={priorityIds}
                  onEmptyAction={() => openTaskModal()}
                />
              )}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Upcoming"
              description="Exams on the horizon."
              action={
                <Link to="/exams" className="text-[11px] text-cyan-300/80 transition-colors hover:text-cyan-200">
                  Manage exams
                </Link>
              }
            />
            <ExamTimeline exams={upcoming.slice(0, 4)} />
          </Card>

          <RecentActivity items={activity} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Focus Session"
              description="Deep work, tracked automatically."
              action={
                <Link to="/focus" className="text-[11px] text-cyan-300/80 transition-colors hover:text-cyan-200">
                  Full screen
                </Link>
              }
            />
            <div className="p-5">
              <FocusTimer timer={timer} compact />
            </div>
          </Card>
          <ProgressOverview
            completionRate={metrics.completionRate}
            completed={metrics.completed}
            total={metrics.total}
            studyHours={weeklyHours}
            upcomingExams={upcoming.length}
            streak={streak}
          />
          <StudyStreakCard streak={streak} data={heatmap(sessions)} />
          <InsightCard insights={insights} />
          <QuickActions />
          <Card className="p-5">
            <p className="text-sm font-medium text-slate-200">Keep the momentum going.</p>
            <p className="mt-1 text-xs text-slate-500">
              You have {metrics.active} active tasks and {upcoming.length} exams ahead. Block out a focus session to stay in
              front of them.
            </p>
            <Button size="sm" variant="secondary" className="mt-4" onClick={() => openTaskModal()}>
              Plan a task
            </Button>
          </Card>
        </div>
      </div>

      <SessionCompleteModal
        open={completedSession !== null}
        minutes={completedSession || 0}
        streak={streak}
        onClose={() => setCompletedSession(null)}
      />
    </div>
  )
}
