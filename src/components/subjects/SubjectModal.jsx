import { useEffect, useState } from 'react'
import { useApp } from '../../context/appStore'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input, Select } from '../ui/Input'
import { SUBJECT_COLORS } from '../../constants/theme'

const emptySubject = () => ({ name: '', teacher: '', color: 'cyan', grade: '—', progress: 0 })

export function SubjectModal({ open, onClose, subject = null }) {
  const { addSubject, updateSubject } = useApp()
  const [form, setForm] = useState(emptySubject)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setError('')
    setForm(subject ? { ...emptySubject(), ...subject } : emptySubject())
  }, [open, subject])

  const setField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event) => {
    event?.preventDefault()
    if (!form.name.trim()) {
      setError('A subject needs a name.')
      return
    }
    const payload = { ...form, progress: Number(form.progress) || 0 }
    if (subject) updateSubject(subject.id, payload)
    else addSubject(payload)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={subject ? 'Edit subject' : 'New subject'}
      description="Subjects group your tasks, exams, and notes."
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>{subject ? 'Save changes' : 'Add subject'}</Button>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={submit}>
        <Input label="Subject name" autoFocus value={form.name} onChange={setField('name')} placeholder="Computer Science" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Teacher" value={form.teacher} onChange={setField('teacher')} placeholder="Dr. Elena Voss" />
          <Input label="Current grade" value={form.grade} onChange={setField('grade')} placeholder="A-" />
          <Select
            label="Accent colour"
            value={form.color}
            onChange={setField('color')}
            options={SUBJECT_COLORS.map((color) => ({
              value: color.value,
              label: color.value.charAt(0).toUpperCase() + color.value.slice(1),
            }))}
          />
          <Input label="Progress (%)" type="number" min="0" max="100" value={form.progress} onChange={setField('progress')} />
        </div>
        {error ? <p className="text-xs text-rose-400">{error}</p> : null}
        <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
      </form>
    </Modal>
  )
}
