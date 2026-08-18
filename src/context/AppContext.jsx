import { useCallback, useMemo, useState } from 'react'
import { AppContext } from './appStore'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS, clearStorage } from '../utils/storage'
import {
  DEFAULT_SETTINGS,
  createSeedExams,
  createSeedNotes,
  createSeedNotifications,
  createSeedSessions,
  createSeedSubjects,
  createSeedTasks,
} from '../data/seedData'

const uid = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

export function AppProvider({ children }) {
  const [tasks, setTasks, resetTasks] = useLocalStorage(STORAGE_KEYS.tasks, createSeedTasks)
  const [exams, setExams, resetExams] = useLocalStorage(STORAGE_KEYS.exams, createSeedExams)
  const [subjects, setSubjects, resetSubjects] = useLocalStorage(STORAGE_KEYS.subjects, createSeedSubjects)
  const [notes, setNotes, resetNotes] = useLocalStorage(STORAGE_KEYS.notes, createSeedNotes)
  const [sessions, setSessions, resetSessions] = useLocalStorage(STORAGE_KEYS.sessions, createSeedSessions)
  const [notifications, setNotifications, resetNotifications] = useLocalStorage(
    STORAGE_KEYS.notifications,
    createSeedNotifications,
  )
  const [settings, setSettings, resetSettings] = useLocalStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS)
  const [priorityIds, setPriorityIds, resetPriorities] = useLocalStorage(STORAGE_KEYS.priorities, [])
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback((toast) => {
    const id = uid('toast')
    setToasts((current) => [...current.slice(-2), { id, tone: 'default', ...toast }])
    return id
  }, [])

  /* ---------------------------------------------------------------- tasks */
  const addTask = useCallback(
    (input) => {
      const task = {
        id: uid('task'),
        title: input.title.trim(),
        description: input.description?.trim() || '',
        subject: input.subject || '',
        priority: input.priority || 'medium',
        dueDate: input.dueDate || '',
        tags: input.tags || [],
        completed: false,
        completedAt: null,
        createdAt: new Date().toISOString(),
      }
      setTasks((current) => [task, ...current])
      pushToast({ tone: 'success', title: 'Task created', description: task.title })
      return task
    },
    [pushToast, setTasks],
  )

  const updateTask = useCallback(
    (id, patch) => {
      setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...patch } : task)))
    },
    [setTasks],
  )

  const deleteTask = useCallback(
    (id) => {
      setTasks((current) => current.filter((task) => task.id !== id))
      setPriorityIds((current) => current.filter((taskId) => taskId !== id))
      pushToast({ tone: 'default', title: 'Task deleted' })
    },
    [pushToast, setPriorityIds, setTasks],
  )

  const toggleTask = useCallback(
    (id) => {
      let completedNow = false
      setTasks((current) =>
        current.map((task) => {
          if (task.id !== id) return task
          completedNow = !task.completed
          return {
            ...task,
            completed: completedNow,
            completedAt: completedNow ? new Date().toISOString() : null,
          }
        }),
      )
      pushToast({
        tone: completedNow ? 'success' : 'default',
        title: completedNow ? 'Task completed' : 'Task reopened',
      })
    },
    [pushToast, setTasks],
  )

  const togglePriority = useCallback(
    (id) => {
      setPriorityIds((current) => {
        if (current.includes(id)) return current.filter((taskId) => taskId !== id)
        if (current.length >= 3) return [...current.slice(1), id]
        return [...current, id]
      })
    },
    [setPriorityIds],
  )

  /* ---------------------------------------------------------------- exams */
  const addExam = useCallback(
    (input) => {
      const exam = {
        id: uid('exam'),
        title: input.title.trim(),
        subject: input.subject || '',
        date: input.date || '',
        time: input.time || '',
        location: input.location || '',
        notes: input.notes || '',
        progress: Number(input.progress) || 0,
        completed: false,
      }
      setExams((current) => [exam, ...current])
      pushToast({ tone: 'success', title: 'Exam added', description: exam.title })
      return exam
    },
    [pushToast, setExams],
  )

  const updateExam = useCallback(
    (id, patch) => setExams((current) => current.map((exam) => (exam.id === id ? { ...exam, ...patch } : exam))),
    [setExams],
  )

  const deleteExam = useCallback(
    (id) => {
      setExams((current) => current.filter((exam) => exam.id !== id))
      pushToast({ tone: 'default', title: 'Exam deleted' })
    },
    [pushToast, setExams],
  )

  /* ------------------------------------------------------------- subjects */
  const addSubject = useCallback(
    (input) => {
      const subject = {
        id: uid('sub'),
        name: input.name.trim(),
        teacher: input.teacher || '',
        color: input.color || 'cyan',
        grade: input.grade || '—',
        progress: Number(input.progress) || 0,
      }
      setSubjects((current) => [...current, subject])
      pushToast({ tone: 'success', title: 'Subject added', description: subject.name })
      return subject
    },
    [pushToast, setSubjects],
  )

  const updateSubject = useCallback(
    (id, patch) =>
      setSubjects((current) => current.map((subject) => (subject.id === id ? { ...subject, ...patch } : subject))),
    [setSubjects],
  )

  const deleteSubject = useCallback(
    (id) => {
      setSubjects((current) => current.filter((subject) => subject.id !== id))
      pushToast({ tone: 'default', title: 'Subject removed' })
    },
    [pushToast, setSubjects],
  )

  /* ---------------------------------------------------------------- notes */
  const addNote = useCallback(
    (input) => {
      const now = new Date().toISOString()
      const note = {
        id: uid('note'),
        title: input.title.trim() || 'Untitled note',
        content: input.content || '',
        subject: input.subject || '',
        tags: input.tags || [],
        pinned: false,
        createdAt: now,
        updatedAt: now,
      }
      setNotes((current) => [note, ...current])
      pushToast({ tone: 'success', title: 'Note created', description: note.title })
      return note
    },
    [pushToast, setNotes],
  )

  const updateNote = useCallback(
    (id, patch) =>
      setNotes((current) =>
        current.map((note) => (note.id === id ? { ...note, ...patch, updatedAt: new Date().toISOString() } : note)),
      ),
    [setNotes],
  )

  const deleteNote = useCallback(
    (id) => {
      setNotes((current) => current.filter((note) => note.id !== id))
      pushToast({ tone: 'default', title: 'Note deleted' })
    },
    [pushToast, setNotes],
  )

  const toggleNotePin = useCallback(
    (id) => setNotes((current) => current.map((note) => (note.id === id ? { ...note, pinned: !note.pinned } : note))),
    [setNotes],
  )

  /* -------------------------------------------------------------- focus */
  const logSession = useCallback(
    ({ minutes, subject, taskTitle }) => {
      const session = {
        id: uid('session'),
        minutes,
        subject: subject || '',
        taskTitle: taskTitle || null,
        completedAt: new Date().toISOString(),
      }
      setSessions((current) => [...current, session])
      return session
    },
    [setSessions],
  )

  /* ------------------------------------------------------- notifications */
  const markNotificationRead = useCallback(
    (id) =>
      setNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item))),
    [setNotifications],
  )

  const markAllNotificationsRead = useCallback(
    () => setNotifications((current) => current.map((item) => ({ ...item, read: true }))),
    [setNotifications],
  )

  /* ------------------------------------------------------------- settings */
  const updateSettings = useCallback(
    (patch) => setSettings((current) => ({ ...current, ...patch })),
    [setSettings],
  )

  const updateNestedSetting = useCallback(
    (group, key, value) =>
      setSettings((current) => ({ ...current, [group]: { ...current[group], [key]: value } })),
    [setSettings],
  )

  /* ------------------------------------------------------------------ data */
  const exportData = useCallback(
    () => ({ tasks, exams, subjects, notes, sessions, settings, notifications, priorityIds }),
    [tasks, exams, subjects, notes, sessions, settings, notifications, priorityIds],
  )

  const loadSampleData = useCallback(() => {
    resetTasks()
    resetExams()
    resetSubjects()
    resetNotes()
    resetSessions()
    resetNotifications()
    resetPriorities()
    pushToast({ tone: 'success', title: 'Sample data restored' })
  }, [
    pushToast,
    resetExams,
    resetNotes,
    resetNotifications,
    resetPriorities,
    resetSessions,
    resetSubjects,
    resetTasks,
  ])

  const clearAllData = useCallback(() => {
    setTasks([])
    setExams([])
    setSubjects([])
    setNotes([])
    setSessions([])
    setNotifications([])
    setPriorityIds([])
    resetSettings()
    clearStorage()
    pushToast({ tone: 'default', title: 'Local data cleared' })
  }, [
    pushToast,
    resetSettings,
    setExams,
    setNotes,
    setNotifications,
    setPriorityIds,
    setSessions,
    setSubjects,
    setTasks,
  ])

  const value = useMemo(
    () => ({
      tasks,
      exams,
      subjects,
      notes,
      sessions,
      settings,
      notifications,
      priorityIds,
      toasts,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      togglePriority,
      addExam,
      updateExam,
      deleteExam,
      addSubject,
      updateSubject,
      deleteSubject,
      addNote,
      updateNote,
      deleteNote,
      toggleNotePin,
      logSession,
      markNotificationRead,
      markAllNotificationsRead,
      updateSettings,
      updateNestedSetting,
      exportData,
      loadSampleData,
      clearAllData,
      pushToast,
      dismissToast,
    }),
    [
      tasks,
      exams,
      subjects,
      notes,
      sessions,
      settings,
      notifications,
      priorityIds,
      toasts,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      togglePriority,
      addExam,
      updateExam,
      deleteExam,
      addSubject,
      updateSubject,
      deleteSubject,
      addNote,
      updateNote,
      deleteNote,
      toggleNotePin,
      logSession,
      markNotificationRead,
      markAllNotificationsRead,
      updateSettings,
      updateNestedSetting,
      exportData,
      loadSampleData,
      clearAllData,
      pushToast,
      dismissToast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
