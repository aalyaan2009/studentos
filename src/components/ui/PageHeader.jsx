import { motion } from 'framer-motion'

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400/80">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1.5 max-w-2xl text-sm text-slate-400">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </motion.header>
  )
}
