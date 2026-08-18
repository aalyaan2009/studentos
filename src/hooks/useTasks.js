import { useMemo } from 'react'
import { useApp } from '../context/appStore'
import { PRIORITY_WEIGHT } from '../constants/theme'
import { daysUntil, isOverdue } from '../utils/dates'
import { taskMetrics } from '../utils/analytics'

const SORTERS = {
  dueDate: (a, b) => (daysUntil(a.dueDate) ?? 9999) - (daysUntil(b.dueDate) ?? 9999),
  priority: (a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority],
  created: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  title: (a, b) => a.title.localeCompare(b.title),
}

export function filterTasks(tasks, { status = 'all', subject = 'all', priority = 'all', query = '', sort = 'dueDate' }) {
  const needle = query.trim().toLowerCase()
  const filtered = tasks.filter((task) => {
    if (status === 'active' && task.completed) return false
    if (status === 'completed' && !task.completed) return false
    if (status === 'overdue' && (task.completed || !isOverdue(task.dueDate))) return false
    if (subject !== 'all' && task.subject !== subject) return false
    if (priority !== 'all' && task.priority !== priority) return false
    if (!needle) return true
    return (
      task.title.toLowerCase().includes(needle) ||
      task.description.toLowerCase().includes(needle) ||
      task.subject.toLowerCase().includes(needle) ||
      (task.tags || []).some((tag) => tag.toLowerCase().includes(needle))
    )
  })
  return [...filtered].sort(SORTERS[sort] || SORTERS.dueDate)
}

export function useTasks(filters) {
  const { tasks } = useApp()
  return useMemo(() => filterTasks(tasks, filters || {}), [tasks, filters])
}

export function useTaskMetrics() {
  const { tasks } = useApp()
  return useMemo(() => taskMetrics(tasks), [tasks])
}
