import { useEffect, useState } from 'react'
import { useApp } from '../../context/appStore'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input, Select, Textarea } from '../ui/Input'
import { PRIORITIES } from '../../constants/theme'
import { toISODate } from '../../utils/dates'

const emptyTask = () => ({
  title: '',
  description: '',
  subject: '',
  priority: 'medium',
  dueDate: toISODate(),
  tags: '',
})

export function TaskModal({ open, onClose, task = null }) {
  const { subjects, addTask, updateTask } = useApp()
  const [form, setForm] = useState(emptyTask)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setError('')
    setForm(
      task
        ? {
            title: task.title,
            description: task.description || '',
            subject: task.subject || '',
            priority: task.priority,
            dueDate: task.dueDate || '',
            tags: (task.tags || []).join(', '),
          }
        : emptyTask(),
    )
  }, [open, task])

  const setField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event) => {
    event?.preventDefault()
    if (!form.title.trim()) {
      setError('A task needs a title.')
      return
    }
    const payload = {
      ...form,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }
    if (task) updateTask(task.id, payload)
    else addTask(payload)
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={task ? 'Edit task' : 'New task'}
      description={task ? 'Update the details of this task.' : 'Capture what needs to happen and when.'}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>{task ? 'Save changes' : 'Create task'}</Button>
        </div>
      }
    >
      <form className="space-y-4" onSubmit={submit}>
        <Input
          label="Task title"
          autoFocus
          value={form.title}
          onChange={setField('title')}
          placeholder="Finish mathematics chapter 4"
        />
        <Textarea
          label="Description"
          rows={3}
          value={form.description}
          onChange={setField('description')}
          placeholder="Optional detail, checklist, or context."
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
          <Select
            label="Priority"
            value={form.priority}
            onChange={setField('priority')}
            options={PRIORITIES.map((item) => ({ value: item.value, label: item.label }))}
          />
          <Input label="Due date" type="date" value={form.dueDate} onChange={setField('dueDate')} />
          <Input label="Tags" value={form.tags} onChange={setField('tags')} placeholder="revision, essay" />
        </div>
        {error ? <p className="text-xs text-rose-400">{error}</p> : null}
        <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
      </form>
    </Modal>
  )
}
