import { AnimatePresence } from 'framer-motion'
import { ListChecks } from 'lucide-react'
import { TaskItem } from './TaskItem'
import { EmptyState } from '../ui/EmptyState'
import { Button } from '../ui/Button'

export function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
  onTogglePriority,
  priorityIds = [],
  emptyTitle = 'No tasks yet.',
  emptyDescription = 'Your academic workspace is ready. Add your first task and start organizing your day.',
  onEmptyAction,
  emptyActionLabel = 'Create first task',
}) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListChecks}
        title={emptyTitle}
        description={emptyDescription}
        action={onEmptyAction ? <Button onClick={onEmptyAction}>{emptyActionLabel}</Button> : null}
      />
    )
  }

  return (
    <ul className="space-y-2.5">
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onTogglePriority={onTogglePriority}
            isPriority={priorityIds.includes(task.id)}
          />
        ))}
      </AnimatePresence>
    </ul>
  )
}
