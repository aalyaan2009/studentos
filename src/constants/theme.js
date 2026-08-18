export const PRIORITIES = [
  { value: 'low', label: 'Low', dot: 'bg-slate-400', chip: 'border-slate-700/70 bg-slate-800/60 text-slate-300' },
  { value: 'medium', label: 'Medium', dot: 'bg-blue-400', chip: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
  { value: 'high', label: 'High', dot: 'bg-amber-400', chip: 'border-amber-500/30 bg-amber-500/10 text-amber-300' },
  { value: 'urgent', label: 'Urgent', dot: 'bg-rose-400', chip: 'border-rose-500/30 bg-rose-500/10 text-rose-300' },
]

export const PRIORITY_WEIGHT = { urgent: 0, high: 1, medium: 2, low: 3 }

export const SUBJECT_COLORS = [
  { value: 'cyan', ring: 'text-cyan-400', dot: 'bg-cyan-400', soft: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300' },
  { value: 'violet', ring: 'text-violet-400', dot: 'bg-violet-400', soft: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-300' },
  { value: 'emerald', ring: 'text-emerald-400', dot: 'bg-emerald-400', soft: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-300' },
  { value: 'blue', ring: 'text-blue-400', dot: 'bg-blue-400', soft: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-300' },
  { value: 'amber', ring: 'text-amber-400', dot: 'bg-amber-400', soft: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300' },
  { value: 'rose', ring: 'text-rose-400', dot: 'bg-rose-400', soft: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-300' },
]

export function priorityMeta(value) {
  return PRIORITIES.find((item) => item.value === value) || PRIORITIES[0]
}

export function colorMeta(value) {
  return SUBJECT_COLORS.find((item) => item.value === value) || SUBJECT_COLORS[0]
}

export const FOCUS_PRESETS = [25, 50, 90]

export const MOTION = {
  page: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.24, ease: 'easeOut' },
  },
  card: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.22, ease: 'easeOut' },
  },
}
