import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BookOpen, Plus } from 'lucide-react'
import { useApp } from '../context/appStore'
import { useUi } from '../context/uiStore'
import { PageHeader } from '../components/ui/PageHeader'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { SubjectCard } from '../components/subjects/SubjectCard'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'

export default function Subjects() {
  const { subjects, tasks, exams, deleteSubject } = useApp()
  const { openSubjectModal } = useUi()
  const [pendingDelete, setPendingDelete] = useState(null)

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Curriculum"
        title="Subjects"
        description="Every course you are taking this semester, with its own workload."
        actions={
          <Button onClick={() => openSubjectModal()}>
            <Plus className="h-4 w-4" />
            Add subject
          </Button>
        }
      />

      {subjects.length === 0 ? (
        <Card>
          <EmptyState
            icon={BookOpen}
            title="No subjects yet."
            description="Add the courses you are taking so tasks, exams and notes can be grouped."
            action={<Button onClick={() => openSubjectModal()}>Create first subject</Button>}
          />
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence initial={false}>
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                taskCount={tasks.filter((task) => task.subject === subject.name).length}
                examCount={exams.filter((exam) => exam.subject === subject.name).length}
                onEdit={openSubjectModal}
                onDelete={setPendingDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && deleteSubject(pendingDelete.id)}
        title="Delete this subject?"
        description={pendingDelete?.name}
        confirmLabel="Delete subject"
      />
    </div>
  )
}
