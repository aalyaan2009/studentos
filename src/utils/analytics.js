import { daysUntil, isOverdue, lastNDays, startOfWeek, toISODate } from './dates'

export function taskMetrics(tasks) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const active = tasks.filter((task) => !task.completed)
  const overdue = active.filter((task) => isOverdue(task.dueDate)).length
  const dueSoon = active.filter((task) => {
    const diff = daysUntil(task.dueDate)
    return diff !== null && diff >= 0 && diff <= 3
  }).length
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)
  return { total, completed, active: active.length, overdue, dueSoon, completionRate }
}

export function focusMinutes(sessions) {
  return sessions.reduce((sum, session) => sum + (session.minutes || 0), 0)
}

export function focusHours(sessions) {
  return Math.round((focusMinutes(sessions) / 60) * 10) / 10
}

export function sessionsInRange(sessions, days) {
  const window = new Set(lastNDays(days))
  return sessions.filter((session) => window.has(toISODate(new Date(session.completedAt))))
}

export function tasksCompletedInRange(tasks, days) {
  const window = new Set(lastNDays(days))
  return tasks.filter(
    (task) => task.completed && task.completedAt && window.has(toISODate(new Date(task.completedAt))),
  )
}

export function studyStreak(sessions) {
  const active = new Set(sessions.map((session) => toISODate(new Date(session.completedAt))))
  let streak = 0
  const cursor = new Date()
  // Today may still be in progress, so an empty today does not break the streak.
  if (!active.has(toISODate(cursor))) cursor.setDate(cursor.getDate() - 1)
  while (active.has(toISODate(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function heatmap(sessions, days = 35) {
  const buckets = new Map()
  sessions.forEach((session) => {
    const key = toISODate(new Date(session.completedAt))
    buckets.set(key, (buckets.get(key) || 0) + (session.minutes || 0))
  })
  return lastNDays(days).map((date) => ({ date, minutes: buckets.get(date) || 0 }))
}

export function weeklyStudySeries(sessions) {
  const start = startOfWeek()
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    const key = toISODate(date)
    const minutes = sessions
      .filter((session) => toISODate(new Date(session.completedAt)) === key)
      .reduce((sum, session) => sum + (session.minutes || 0), 0)
    return { label: date.toLocaleDateString(undefined, { weekday: 'short' }), value: minutes, date: key }
  })
}

export function subjectDistribution(tasks, subjects) {
  return subjects
    .map((subject) => ({
      id: subject.id,
      name: subject.name,
      color: subject.color,
      value: tasks.filter((task) => task.subject === subject.name).length,
    }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value)
}

export function productivityInsights({ tasks, sessions, exams }) {
  const insights = []
  const thisWeek = tasksCompletedInRange(tasks, 7).length
  const lastWeek = tasksCompletedInRange(tasks, 14).length - thisWeek
  if (lastWeek > 0) {
    const delta = Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
    insights.push({
      id: 'weekly-delta',
      tone: delta >= 0 ? 'success' : 'warning',
      text:
        delta >= 0
          ? `You completed ${delta}% more tasks this week than last week.`
          : `You completed ${Math.abs(delta)}% fewer tasks than last week.`,
    })
  } else if (thisWeek > 0) {
    insights.push({ id: 'weekly-delta', tone: 'success', text: `You completed ${thisWeek} tasks in the last 7 days.` })
  }

  const hourBuckets = new Map()
  sessions.forEach((session) => {
    const hour = new Date(session.completedAt).getHours()
    hourBuckets.set(hour, (hourBuckets.get(hour) || 0) + (session.minutes || 0))
  })
  const peak = [...hourBuckets.entries()].sort((a, b) => b[1] - a[1])[0]
  if (peak) {
    const from = `${peak[0]}`.padStart(2, '0')
    const to = `${(peak[0] + 3) % 24}`.padStart(2, '0')
    insights.push({ id: 'peak-hours', tone: 'info', text: `You are most productive between ${from}:00 and ${to}:00.` })
  }

  const approaching = tasks.filter((task) => {
    const diff = daysUntil(task.dueDate)
    return !task.completed && diff !== null && diff >= 0 && diff <= 3
  }).length
  if (approaching > 0) {
    insights.push({ id: 'deadlines', tone: 'warning', text: `You have ${approaching} deadlines approaching this week.` })
  }

  const nextExam = exams
    .filter((exam) => !exam.completed && (daysUntil(exam.date) ?? -1) >= 0)
    .sort((a, b) => daysUntil(a.date) - daysUntil(b.date))[0]
  if (nextExam) {
    insights.push({
      id: 'next-exam',
      tone: 'info',
      text: `${nextExam.title} is ${daysUntil(nextExam.date)} days away at ${nextExam.progress}% preparation.`,
    })
  }

  return insights.slice(0, 3)
}

export function examUrgency(days) {
  if (days === null) return 'neutral'
  if (days < 0) return 'neutral'
  if (days <= 3) return 'urgent'
  if (days <= 7) return 'warning'
  return 'normal'
}
