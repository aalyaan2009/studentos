import { motion } from 'framer-motion'
import { Pin, Trash2 } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { cn } from '../../utils/cn'
import { formatTimestamp } from '../../utils/dates'

export function NoteCard({ note, onOpen, onTogglePin, onDelete }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex h-full flex-col rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 text-left backdrop-blur-md transition-colors duration-200 hover:border-slate-700"
    >
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => onOpen(note)}
          className="min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 rounded-lg"
        >
          <h3 className="truncate text-sm font-semibold text-slate-100">{note.title}</h3>
          <p className="mt-1.5 line-clamp-3 whitespace-pre-line text-xs text-slate-500">{note.content}</p>
        </button>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onTogglePin(note.id)}
            aria-label={note.pinned ? `Unpin ${note.title}` : `Pin ${note.title}`}
            className={cn(
              'rounded-lg p-1.5 transition-colors hover:bg-slate-800/70',
              note.pinned ? 'text-cyan-300' : 'text-slate-600 hover:text-slate-300',
            )}
          >
            <Pin className={cn('h-3.5 w-3.5', note.pinned && 'fill-cyan-300')} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(note)}
            aria-label={`Delete ${note.title}`}
            className="rounded-lg p-1.5 text-slate-600 opacity-0 transition-all hover:bg-rose-500/10 hover:text-rose-300 group-hover:opacity-100 focus-visible:opacity-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 pt-3 text-[11px] text-slate-500">
        {note.subject ? <Badge>{note.subject}</Badge> : <span className="text-slate-600">No subject</span>}
        <span>{formatTimestamp(note.updatedAt)}</span>
      </div>
    </motion.article>
  )
}
