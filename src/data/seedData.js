import { addDays, toISODate } from '../utils/dates'

const relative = (offset) => toISODate(addDays(new Date(), offset))
const hoursAgo = (hours) => new Date(Date.now() - hours * 3600 * 1000).toISOString()

export const createSeedSubjects = () => [
  { id: 'sub-cs', name: 'Computer Science', teacher: 'Dr. Elena Voss', color: 'cyan', grade: 'A-', progress: 72 },
  { id: 'sub-math', name: 'Mathematics', teacher: 'Mr. Idris Khan', color: 'violet', grade: 'B+', progress: 64 },
  { id: 'sub-phys', name: 'Physics', teacher: 'Ms. Clara Nunez', color: 'emerald', grade: 'A', progress: 81 },
  { id: 'sub-eng', name: 'English', teacher: 'Mr. Peter Hale', color: 'amber', grade: 'B', progress: 55 },
  { id: 'sub-stats', name: 'Statistics', teacher: 'Dr. Amara Boateng', color: 'blue', grade: 'A-', progress: 68 },
]

export const createSeedTasks = () => [
  {
    id: 'task-1',
    title: 'Complete Computer Science project',
    description: 'Finish the graph traversal visualiser and write the README for submission.',
    subject: 'Computer Science',
    priority: 'urgent',
    dueDate: relative(1),
    completed: false,
    tags: ['project', 'coursework'],
    createdAt: hoursAgo(52),
    completedAt: null,
  },
  {
    id: 'task-2',
    title: 'Review Calculus Chapter 5',
    description: 'Work through integration by parts exercises 5.1 to 5.4.',
    subject: 'Mathematics',
    priority: 'high',
    dueDate: relative(2),
    completed: false,
    tags: ['revision'],
    createdAt: hoursAgo(40),
    completedAt: null,
  },
  {
    id: 'task-3',
    title: 'Submit English essay',
    description: 'Final proofread of the comparative essay on modernist poetry.',
    subject: 'English',
    priority: 'medium',
    dueDate: relative(-1),
    completed: false,
    tags: ['essay'],
    createdAt: hoursAgo(96),
    completedAt: null,
  },
  {
    id: 'task-4',
    title: 'Prepare Physics lab report',
    description: 'Plot the resistance data and complete the uncertainty analysis.',
    subject: 'Physics',
    priority: 'high',
    dueDate: relative(4),
    completed: false,
    tags: ['lab'],
    createdAt: hoursAgo(30),
    completedAt: null,
  },
  {
    id: 'task-5',
    title: 'Statistics problem set 3',
    description: 'Hypothesis testing questions 1 through 12.',
    subject: 'Statistics',
    priority: 'medium',
    dueDate: relative(6),
    completed: false,
    tags: ['homework'],
    createdAt: hoursAgo(20),
    completedAt: null,
  },
  {
    id: 'task-6',
    title: 'Read Physics chapter 6',
    description: 'Electromagnetic induction, take structured notes.',
    subject: 'Physics',
    priority: 'low',
    dueDate: relative(-2),
    completed: true,
    tags: ['reading'],
    createdAt: hoursAgo(120),
    completedAt: hoursAgo(28),
  },
  {
    id: 'task-7',
    title: 'Algorithms quiz revision',
    description: 'Revise sorting complexity and recurrence relations.',
    subject: 'Computer Science',
    priority: 'medium',
    dueDate: relative(-3),
    completed: true,
    tags: ['revision'],
    createdAt: hoursAgo(140),
    completedAt: hoursAgo(50),
  },
  {
    id: 'task-8',
    title: 'Mathematics notes cleanup',
    description: 'Rewrite the series convergence notes into the master document.',
    subject: 'Mathematics',
    priority: 'low',
    dueDate: relative(-4),
    completed: true,
    tags: ['notes'],
    createdAt: hoursAgo(160),
    completedAt: hoursAgo(74),
  },
]

export const createSeedExams = () => [
  {
    id: 'exam-1',
    title: 'Mathematics Final',
    subject: 'Mathematics',
    date: relative(12),
    time: '09:00',
    location: 'Hall B',
    notes: 'Covers calculus, series and linear algebra.',
    progress: 68,
    completed: false,
  },
  {
    id: 'exam-2',
    title: 'Computer Science Midterm',
    subject: 'Computer Science',
    date: relative(5),
    time: '13:30',
    location: 'Lab 4',
    notes: 'Data structures, complexity analysis, and recursion.',
    progress: 45,
    completed: false,
  },
  {
    id: 'exam-3',
    title: 'Physics Quiz',
    subject: 'Physics',
    date: relative(2),
    time: '11:15',
    location: 'Room 210',
    notes: 'Short quiz on induction and circuits.',
    progress: 82,
    completed: false,
  },
  {
    id: 'exam-4',
    title: 'English Literature Test',
    subject: 'English',
    date: relative(-9),
    time: '10:00',
    location: 'Room 118',
    notes: 'Completed — modernist poetry analysis.',
    progress: 100,
    completed: true,
  },
]

export const createSeedNotes = () => [
  {
    id: 'note-1',
    title: 'Binary Trees',
    content:
      'Traversals: inorder gives sorted output for a BST. Preorder is useful for serialisation, postorder for deletion.\n\nBalanced trees keep height at log n, which keeps search predictable.',
    subject: 'Computer Science',
    tags: ['data-structures'],
    pinned: true,
    updatedAt: hoursAgo(6),
    createdAt: hoursAgo(72),
  },
  {
    id: 'note-2',
    title: 'Integration by parts',
    content: 'Formula: ∫u dv = uv − ∫v du. Choose u using LIATE: logs, inverse trig, algebraic, trig, exponential.',
    subject: 'Mathematics',
    tags: ['calculus'],
    pinned: false,
    updatedAt: hoursAgo(26),
    createdAt: hoursAgo(90),
  },
  {
    id: 'note-3',
    title: 'Lab report structure',
    content: 'Aim, apparatus, method, results, uncertainty analysis, conclusion. Always state assumptions explicitly.',
    subject: 'Physics',
    tags: ['lab', 'template'],
    pinned: false,
    updatedAt: hoursAgo(48),
    createdAt: hoursAgo(150),
  },
]

export const createSeedSessions = () => {
  const plan = [
    { day: -6, minutes: [50] },
    { day: -5, minutes: [25, 50] },
    { day: -4, minutes: [90] },
    { day: -3, minutes: [25] },
    { day: -2, minutes: [50, 25] },
    { day: -1, minutes: [50] },
    { day: 0, minutes: [25] },
  ]
  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Statistics']
  return plan.flatMap((entry, dayIndex) =>
    entry.minutes.map((minutes, index) => {
      const date = addDays(new Date(), entry.day)
      date.setHours(18 + index, 30, 0, 0)
      return {
        id: `session-${dayIndex}-${index}`,
        minutes,
        subject: subjects[(dayIndex + index) % subjects.length],
        taskTitle: null,
        completedAt: date.toISOString(),
      }
    }),
  )
}

export const createSeedNotifications = () => [
  {
    id: 'notif-1',
    tone: 'warning',
    title: 'Computer Science project due tomorrow',
    body: 'Submission closes at 23:59.',
    createdAt: hoursAgo(2),
    read: false,
  },
  {
    id: 'notif-2',
    tone: 'urgent',
    title: 'Physics Quiz in 2 days',
    body: 'Preparation is at 82%.',
    createdAt: hoursAgo(9),
    read: false,
  },
  {
    id: 'notif-3',
    tone: 'success',
    title: 'You completed 3 tasks this week',
    body: 'Keep the momentum going.',
    createdAt: hoursAgo(30),
    read: true,
  },
]

export const DEFAULT_SETTINGS = {
  displayName: 'Aalyaan',
  theme: 'dark',
  reducedMotion: false,
  compactDensity: false,
  notifications: {
    assignments: true,
    exams: true,
    study: false,
  },
  productivity: {
    defaultFocusMinutes: 25,
    dailyGoalMinutes: 120,
    autoStartBreaks: false,
  },
}
