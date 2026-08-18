import { motion } from 'framer-motion'
import { Plus, Timer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { greeting } from '../../utils/dates'

export function HeroPanel({ onAddTask, name }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/40 px-6 py-10 backdrop-blur-md sm:px-10 sm:py-14"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.14),transparent_45%)]"
      />
      <div className="relative max-w-3xl">
        <p className="text-sm text-slate-400">
          {greeting()} {name ? <span className="text-slate-300">{name}.</span> : null}
        </p>
        <p className="mt-1 text-sm text-slate-500">Here’s your academic overview for today.</p>
        <h1 className="mt-6 bg-gradient-to-r from-cyan-300 via-white to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
          Your Personal Academic Workspace.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Plan assignments, stay ahead of exams, focus without distractions, and keep your entire academic workflow in one
          intelligent workspace.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={onAddTask}>
            <Plus className="h-4 w-4" />
            Add your first task
          </Button>
          <Link
            to="/focus"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/70 px-6 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
          >
            <Timer className="h-4 w-4" />
            Start a focus session
          </Link>
        </div>
      </div>
    </motion.section>
  )
}
