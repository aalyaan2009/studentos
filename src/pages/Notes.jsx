import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FileText, Plus, Search } from 'lucide-react'
import { useApp } from '../context/appStore'
import { useUi } from '../context/uiStore'
import { PageHeader } from '../components/ui/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { NoteCard } from '../components/notes/NoteCard'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'

export default function Notes() {
  const { notes, subjects, toggleNotePin, deleteNote } = useApp()
  const { openNoteModal } = useUi()
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('all')
  const [pendingDelete, setPendingDelete] = useState(null)

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return notes
      .filter((note) => {
        if (subject !== 'all' && note.subject !== subject) return false
        if (!needle) return true
        return (
          note.title.toLowerCase().includes(needle) ||
          note.content.toLowerCase().includes(needle) ||
          (note.tags || []).some((tag) => tag.toLowerCase().includes(needle))
        )
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      })
  }, [notes, query, subject])

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge"
        title="Notes"
        description="Short, searchable notes that stay attached to your subjects."
        actions={
          <Button onClick={() => openNoteModal()}>
            <Plus className="h-4 w-4" />
            New note
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search notes"
            aria-label="Search notes"
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/70 focus:outline-none"
          />
        </div>
        <select
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          aria-label="Filter notes by subject"
          className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-300 focus:border-cyan-500/70 focus:outline-none"
        >
          <option value="all">All subjects</option>
          {subjects.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <Card>
          <EmptyState
            icon={FileText}
            title={query ? 'No notes match that search.' : 'No notes yet.'}
            description={
              query
                ? 'Try a different keyword or clear the filters.'
                : 'Capture definitions, formulas, and summaries so revision is quick.'
            }
            action={<Button onClick={() => openNoteModal()}>Create first note</Button>}
          />
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence initial={false}>
            {visible.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onOpen={openNoteModal}
                onTogglePin={toggleNotePin}
                onDelete={setPendingDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && deleteNote(pendingDelete.id)}
        title="Delete this note?"
        description={pendingDelete?.title}
      />
    </div>
  )
}
