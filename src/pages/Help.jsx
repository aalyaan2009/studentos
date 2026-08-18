import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'

const TOPICS = [
  {
    title: 'Capture quickly',
    body: 'Use the quick add bar on the dashboard or press N anywhere to open the full task composer.',
  },
  {
    title: 'Stay ahead of exams',
    body: 'Add each exam with its date and drag the preparation slider as you revise. Countdowns turn amber inside a week and rose inside three days.',
  },
  {
    title: 'Focus sessions',
    body: 'Start a timer on the Focus page. Completed sessions are logged, build your streak, and feed the analytics charts.',
  },
  {
    title: 'Your data',
    body: 'Everything lives in this browser via localStorage. Export a JSON backup or reset to sample data from Settings.',
  },
]

export default function Help() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Support" title="Help" description="A short guide to getting the most out of StudentOS." />
      <div className="grid gap-4 sm:grid-cols-2">
        {TOPICS.map((topic) => (
          <Card key={topic.title}>
            <CardHeader title={topic.title} />
            <p className="px-5 py-4 text-sm text-slate-400">{topic.body}</p>
          </Card>
        ))}
      </div>
      <p className="text-sm text-slate-500">
        Need to change a preference? Open <Link to="/settings" className="text-cyan-300 hover:text-cyan-200">Settings</Link>.
      </p>
    </div>
  )
}
