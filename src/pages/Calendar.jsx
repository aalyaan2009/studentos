import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useApp } from '../context/appStore'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'
import { Tabs } from '../components/ui/Tabs'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { CalendarGrid } from '../components/calendar/CalendarGrid'
import { addDays, formatDate, startOfWeek, toISODate } from '../utils/dates'

const VIEWS = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]

const TYPE_TONES = { task: 'cyan', exam: 'danger', session: 'success' }

export default function Calendar() {
  const { tasks, exams, sessions } = useApp()
  const [view, setView] = useState('month')
  const [cursor, setCursor] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState(() => toISODate())

  const eventsByDate = useMemo(() => {
    const map = new Map()
    const push = (date, event) => {
      if (!date) return
      const list = map.get(date) || []
      list.push(event)
      map.set(date, list)
    }
    tasks.forEach((task) =>
      push(task.dueDate, { id: `t-${task.id}`, type: 'task', title: task.title, meta: task.subject, done: task.completed }),
    )
    exams.forEach((exam) => push(exam.date, { id: `e-${exam.id}`, type: 'exam', title: exam.title, meta: exam.time || exam.subject }))
    sessions.forEach((session) =>
      push(toISODate(new Date(session.completedAt)), {
        id: `s-${session.id}`,
        type: 'session',
        title: `${session.minutes} min focus`,
        meta: session.subject,
      }),
    )
    return map
  }, [exams, sessions, tasks])

  const visibleDates = useMemo(() => {
    if (view === 'today') return [toISODate()]
    if (view === 'week') {
      const start = startOfWeek(cursor)
      return Array.from({ length: 7 }, (_, index) => toISODate(addDays(start, index)))
    }
    return [selectedDate]
  }, [cursor, selectedDate, view])

  const monthLabel = cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  const shift = (amount) => {
    setCursor((current) => {
      const next = new Date(current)
      if (view === 'month') next.setMonth(next.getMonth() + amount)
      else next.setDate(next.getDate() + amount * 7)
      return next
    })
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Planning"
        title="Calendar"
        description="Deadlines, exams and study sessions on one timeline."
        actions={<Tabs value={view} onChange={setView} items={VIEWS} size="sm" />}
      />

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {view === 'month' ? (
          <Card>
            <CardHeader
              title={monthLabel}
              description="Select a day to see what is scheduled."
              action={
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" onClick={() => shift(-1)} aria-label="Previous month">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => shift(1)} aria-label="Next month">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              }
            />
            <div className="p-4">
              <CalendarGrid
                year={cursor.getFullYear()}
                month={cursor.getMonth()}
                eventsByDate={eventsByDate}
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
              />
            </div>
          </Card>
        ) : (
          <Card>
            <CardHeader
              title={view === 'today' ? 'Today' : `Week of ${formatDate(toISODate(startOfWeek(cursor)))}`}
              description="Scheduled items in this range."
              action={
                view === 'week' ? (
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" onClick={() => shift(-1)} aria-label="Previous week">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => shift(1)} aria-label="Next week">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null
              }
            />
            <ul className="divide-y divide-slate-800/60">
              {visibleDates.map((date) => {
                const events = eventsByDate.get(date) || []
                return (
                  <li key={date} className="px-5 py-4">
                    <p className="text-xs font-medium text-slate-300">
                      {formatDate(date, { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                    {events.length === 0 ? (
                      <p className="mt-1.5 text-xs text-slate-600">Nothing scheduled.</p>
                    ) : (
                      <ul className="mt-2 space-y-1.5">
                        {events.map((event) => (
                          <li key={event.id} className="flex items-center gap-2.5 text-sm text-slate-300">
                            <Badge tone={TYPE_TONES[event.type]}>{event.type}</Badge>
                            <span className="min-w-0 flex-1 truncate">{event.title}</span>
                            {event.meta ? <span className="text-[11px] text-slate-500">{event.meta}</span> : null}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </Card>
        )}

        <Card className="h-fit">
          <CardHeader
            title={formatDate(selectedDate, { weekday: 'long', month: 'long', day: 'numeric' })}
            description="Everything scheduled for the selected day."
          />
          <ul className="divide-y divide-slate-800/60">
            {(eventsByDate.get(selectedDate) || []).length === 0 ? (
              <li className="px-5 py-8 text-sm text-slate-500">Nothing scheduled for this day.</li>
            ) : (
              (eventsByDate.get(selectedDate) || []).map((event) => (
                <li key={event.id} className="flex items-center gap-3 px-5 py-3">
                  <Badge tone={TYPE_TONES[event.type]}>{event.type}</Badge>
                  <span className="min-w-0 flex-1 truncate text-sm text-slate-200">{event.title}</span>
                  {event.meta ? <span className="text-[11px] text-slate-500">{event.meta}</span> : null}
                </li>
              ))
            )}
          </ul>
        </Card>
      </div>
    </div>
  )
}
