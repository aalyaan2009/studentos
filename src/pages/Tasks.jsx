import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useApp } from '../context/appStore'
import { useUi } from '../context/uiStore'
import { PageHeader } from '../components/ui/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { QuickAddBar } from '../components/tasks/QuickAddBar'
import { TaskFilters } from '../components/tasks/TaskFilters'
import { TaskList } from '../components/tasks/TaskList'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { filterTasks } from '../hooks/useTasks'
import { taskMetrics } from '../utils/analytics'

const DEFAULT_FILTERS = { status: 'all', subject: 'all', priority: 'all', query: '', sort: 'dueDate' }

export default function Tasks() {
  const { tasks, subjects, priorityIds, toggleTask, deleteTask, togglePriority } = useApp()
  const { openTaskModal } = useUi()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [pendingDelete, setPendingDelete] = useState(null)

  const visible = useMemo(() => filterTasks(tasks, filters), [filters, tasks])
  const metrics = useMemo(() => taskMetrics(tasks), [tasks])

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Tasks"
        description="Everything you need to do, sorted by what matters next."
        actions={
          <Button onClick={() => openTaskModal()}>
            <Plus className="h-4 w-4" />
            New task
          </Button>
        }
      />

      <QuickAddBar />

      <TaskFilters
        filters={filters}
        onChange={setFilters}
        subjects={subjects}
        counts={{
          all: metrics.total,
          active: metrics.active,
          completed: metrics.completed,
          overdue: metrics.overdue,
        }}
      />

      <Card className="p-4">
        <TaskList
          tasks={visible}
          onToggle={toggleTask}
          onEdit={openTaskModal}
          onDelete={setPendingDelete}
          onTogglePriority={togglePriority}
          priorityIds={priorityIds}
          emptyTitle={filters.query || filters.status !== 'all' ? 'No matching tasks.' : 'No tasks yet.'}
          emptyDescription={
            filters.query || filters.status !== 'all'
              ? 'Try a different filter or search term.'
              : 'Your academic workspace is ready. Add your first task and start organizing your day.'
          }
          onEmptyAction={() => openTaskModal()}
        />
      </Card>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && deleteTask(pendingDelete.id)}
        title="Delete this task?"
        description={pendingDelete?.title}
      />
    </div>
  )
}
