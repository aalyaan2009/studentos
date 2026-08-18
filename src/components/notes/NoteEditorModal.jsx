import { useEffect, useState } from 'react'
import { useApp } from '../../context/appStore'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input, Select, Textarea } from '../ui/Input'

const emptyNote = () => ({ title: '', content: '', subject: '', tags: '' })

export function NoteEditorModal({ open, onClose, note = null }) {
  const { subjects, addNote, updateNote } = useApp()
  const [form, setForm] = useState(emptyNote)

  useEffect(() => {
    if (!open) return
    setForm(
      note
        ? { title: note.title, content: note.content, subject: note.subject || '', tags: (note.tags || []).join(', ') }
        : emptyNote(),
    )
  }, [open, note])

  const setField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event) => {
    event?.preventDefault()
    const payload = {
      ...form,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }
    if (note) updateNote(note.id, payload)
    else addNote(payload)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={note ? 'Edit note' : 'New note'}
      description="Notes are stored locally and searchable from the command palette."
      size="lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>{note ? 'Save note' : 'Create note'}</Button>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={submit}>
        <Input label="Title" autoFocus value={form.title} onChange={setField('title')} placeholder="Binary trees" />
        <Textarea
          label="Content"
          rows={10}
          value={form.content}
          onChange={setField('content')}
          placeholder="Write your note..."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Subject" value={form.subject} onChange={setField('subject')}>
            <option value="">No subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </Select>
          <Input label="Tags" value={form.tags} onChange={setField('tags')} placeholder="algorithms, revision" />
        </div>
        <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
      </form>
    </Modal>
  )
}
