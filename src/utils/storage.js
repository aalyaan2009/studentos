const PREFIX = 'studentos:'

function isAvailable() {
  try {
    const key = `${PREFIX}__probe__`
    window.localStorage.setItem(key, '1')
    window.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

const available = typeof window !== 'undefined' && isAvailable()
const memory = new Map()

export function readStorage(key, fallback) {
  if (!available) return memory.has(key) ? memory.get(key) : fallback
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  if (!available) {
    memory.set(key, value)
    return false
  }
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStorage(key) {
  if (!available) {
    memory.delete(key)
    return
  }
  try {
    window.localStorage.removeItem(PREFIX + key)
  } catch {
    /* storage unavailable */
  }
}

export function clearStorage() {
  if (!available) {
    memory.clear()
    return
  }
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => window.localStorage.removeItem(key))
  } catch {
    /* storage unavailable */
  }
}

export const STORAGE_KEYS = {
  tasks: 'tasks',
  exams: 'exams',
  subjects: 'subjects',
  notes: 'notes',
  sessions: 'focus-sessions',
  settings: 'settings',
  notifications: 'notifications',
  priorities: 'daily-priorities',
}
