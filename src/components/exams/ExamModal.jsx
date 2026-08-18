import { useEffect, useState } from 'react'
import { useApp } from '../../context/appStore'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input, Select, Textarea } from '../ui/Input'
import { addDays, toISODate } from '../../utils/dates'

const emptyExam = () => ({
  title: '',
  subject: '',
  date: toISODate(addDays(new Date(), 7)),
  time: '09:00',
  location: '',
  notes: '',
  progress: 0,
})

export function ExamModal({ open, onClose, exam = null }) {
  const { subjects, addExam, updateExam } = useApp()
  const [form, setForm] = useState(emptyExam)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setError('')
    setForm(exam ? { ...emptyExam(), ...exam } : emptyExam())
  }, [open, exam])

  const setField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event) => {
    event?.preventDefault()
    if (!form.title.trim()) {
      setError('An exam needs a title.')
      return
    }
    const payload = { ...form, progress: Number(form.progress) || 0 }
    if (exam) updateExam(exam.id, payload)
    else addExam(payload)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={exam ? 'Edit exam' : 'New exam'}
      description="Track the date, location, and how prepared you are."
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>{exam ? 'Save changes' : 'Add exam'}</Button>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={submit}>
        <Input label="Exam title" autoFocus value={form.title} onChange={setField('title')} placeholder="Mathematics Final" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Subject" value={form.subject} onChange={setField('subject')}>
            <option value="">No subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </Select>
          <Input label="Location" value={form.location} onChange={setField('location')} placeholder="Hall B" />
          <Input label="Date" type="date" value={form.date} onChange={setField('date')} />
          <Input label="Time" type="time" value={form.time} onChange={setField('time')} />
        </div>
        <Input
          label="Preparation progress (%)"
          type="number"
          min="0"
          max="100"
          value={form.progress}
          onChange={setField('progress')}
        />
        <Textarea label="Notes" rows={3} value={form.notes} onChange={setField('notes')} placeholder="Topics to cover" />
        {error ? <p className="text-xs text-rose-400">{error}</p> : null}
        <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
      </form>
    </Modal>
  )
}
