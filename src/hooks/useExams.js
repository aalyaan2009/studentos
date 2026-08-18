import { useMemo } from 'react'
import { useApp } from '../context/appStore'
import { daysUntil } from '../utils/dates'

export function useExams({ query = '', subject = 'all' } = {}) {
  const { exams } = useApp()
  return useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matched = exams.filter((exam) => {
      if (subject !== 'all' && exam.subject !== subject) return false
      if (!needle) return true
      return (
        exam.title.toLowerCase().includes(needle) ||
        exam.subject.toLowerCase().includes(needle) ||
        (exam.location || '').toLowerCase().includes(needle)
      )
    })
    const withDays = matched.map((exam) => ({ ...exam, daysRemaining: daysUntil(exam.date) }))
    const upcoming = withDays
      .filter((exam) => !exam.completed && (exam.daysRemaining ?? -1) >= 0)
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
    const past = withDays
      .filter((exam) => exam.completed || (exam.daysRemaining ?? -1) < 0)
      .sort((a, b) => (b.daysRemaining ?? 0) - (a.daysRemaining ?? 0))
    return { upcoming, past, all: withDays }
  }, [exams, query, subject])
}
