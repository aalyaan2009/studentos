import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CircleHelp,
  FileText,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Settings,
  Timer,
} from 'lucide-react'

export const PRIMARY_NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, shortcut: '1' },
  { to: '/tasks', label: 'Tasks', icon: ListChecks, shortcut: '2' },
  { to: '/exams', label: 'Exams', icon: GraduationCap, shortcut: '3' },
  { to: '/subjects', label: 'Subjects', icon: BookOpen, shortcut: '4' },
  { to: '/focus', label: 'Focus', icon: Timer, shortcut: '5' },
  { to: '/notes', label: 'Notes', icon: FileText, shortcut: '6' },
  { to: '/analytics', label: 'Analytics', icon: BarChart3, shortcut: '7' },
]

export const SECONDARY_NAV = [
  { to: '/calendar', label: 'Calendar', icon: CalendarDays, shortcut: '8' },
]

export const FOOTER_NAV = [
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/help', label: 'Help', icon: CircleHelp },
]

export const MOBILE_NAV = [
  PRIMARY_NAV[0],
  PRIMARY_NAV[1],
  PRIMARY_NAV[2],
  PRIMARY_NAV[4],
  SECONDARY_NAV[0],
]
