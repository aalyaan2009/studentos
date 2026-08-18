const DAY = 24 * 60 * 60 * 1000

export function startOfDay(value = new Date()) {
  const date = new Date(value)
  date.setHours(0, 0, 0, 0)
  return date
}

export function toISODate(value = new Date()) {
  const date = startOfDay(value)
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function parseDate(value) {
  if (!value) return null
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : date
}

export function addDays(value, amount) {
  const date = startOfDay(value)
  date.setDate(date.getDate() + amount)
  return date
}

export function daysUntil(value) {
  const date = parseDate(value)
  if (!date) return null
  return Math.round((startOfDay(date) - startOfDay()) / DAY)
}

export function isOverdue(value) {
  const diff = daysUntil(value)
  return diff !== null && diff < 0
}

export function isToday(value) {
  return daysUntil(value) === 0
}

export function isDueSoon(value, within = 3) {
  const diff = daysUntil(value)
  return diff !== null && diff >= 0 && diff <= within
}

export function formatDate(value, options = { month: 'short', day: 'numeric' }) {
  const date = parseDate(value)
  if (!date) return 'No date'
  return date.toLocaleDateString(undefined, options)
}

export function formatRelativeDay(value) {
  const diff = daysUntil(value)
  if (diff === null) return 'No due date'
  if (diff === 0) return 'Due today'
  if (diff === 1) return 'Due tomorrow'
  if (diff === -1) return '1 day overdue'
  if (diff < 0) return `${Math.abs(diff)} days overdue`
  if (diff <= 7) return `Due in ${diff} days`
  return `Due ${formatDate(value)}`
}

export function formatTimestamp(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const diff = Date.now() - date.getTime()
  const minutes = Math.round(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function formatClock(totalSeconds) {
  const safe = Math.max(0, Math.round(totalSeconds))
  const minutes = `${Math.floor(safe / 60)}`.padStart(2, '0')
  const seconds = `${safe % 60}`.padStart(2, '0')
  return `${minutes}:${seconds}`
}

export function greeting(date = new Date()) {
  const hour = date.getHours()
  if (hour < 12) return 'Good morning.'
  if (hour < 18) return 'Good afternoon.'
  return 'Good evening.'
}

export function lastNDays(count, endDate = new Date()) {
  return Array.from({ length: count }, (_, index) => toISODate(addDays(endDate, index - count + 1)))
}

export function startOfWeek(value = new Date()) {
  const date = startOfDay(value)
  const weekday = (date.getDay() + 6) % 7
  return addDays(date, -weekday)
}

export function monthMatrix(year, month) {
  const first = new Date(year, month, 1)
  const start = startOfWeek(first)
  return Array.from({ length: 42 }, (_, index) => addDays(start, index))
}

export const DAY_MS = DAY
