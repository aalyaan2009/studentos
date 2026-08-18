import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { GraduationCap, Plus, Search } from 'lucide-react'
import { useApp } from '../context/appStore'
import { useUi } from '../context/uiStore'
import { useExams } from '../hooks/useExams'
import { PageHeader } from '../components/ui/PageHeader'
import { Button } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { Tabs } from '../components/ui/Tabs'
import { EmptyState } from '../components/ui/EmptyState'
import { ExamCard } from '../components/exams/ExamCard'
import { ExamTimeline } from '../components/exams/ExamTimeline'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'

export default function Exams() {
  const { subjects, updateExam, deleteExam } = useApp()
  const { openExamModal } = useUi()
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('all')
  const [tab, setTab] = useState('upcoming')
  const [pendingDelete, setPendingDelete] = useState(null)
  const { upcoming, past } = useExams({ query, subject })

  const list = tab === 'upcoming' ? upcoming : past

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Assessment"
        title="Exams"
        description="Countdowns, locations, and how prepared you are for each one."
        actions={
          <Button onClick={() => openExamModal()}>
            <Plus className="h-4 w-4" />
            Add exam
          </Button>
        }
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: 'upcoming', label: 'Upcoming', count: upcoming.length },
            { value: 'past', label: 'Completed', count: past.length },
          ]}
        />
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search exams"
              aria-label="Search exams"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-2 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-cyan-500/70 focus:outline-none sm:w-52"
            />
          </div>
          <select
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            aria-label="Filter exams by subject"
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
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div>
          {list.length === 0 ? (
            <Card>
              <EmptyState
                icon={GraduationCap}
                title={tab === 'upcoming' ? 'No upcoming exams.' : 'No completed exams yet.'}
                description={
                  tab === 'upcoming'
                    ? 'Add your exam dates and StudentOS will keep the countdown running.'
                    : 'Exams move here once their date has passed.'
                }
                action={tab === 'upcoming' ? <Button onClick={() => openExamModal()}>Add your first exam</Button> : null}
              />
            </Card>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              <AnimatePresence initial={false}>
                {list.map((exam) => (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    onEdit={openExamModal}
                    onDelete={setPendingDelete}
                    onProgressChange={(id, progress) => updateExam(id, { progress })}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <Card className="h-fit">
          <CardHeader title="Exam timeline" description="Chronological view of what is coming." />
          <ExamTimeline exams={upcoming} />
        </Card>
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => pendingDelete && deleteExam(pendingDelete.id)}
        title="Delete this exam?"
        description={pendingDelete?.title}
      />
    </div>
  )
}
