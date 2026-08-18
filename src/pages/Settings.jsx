import { useState } from 'react'
import { Download, RefreshCcw, Trash2 } from 'lucide-react'
import { useApp } from '../context/appStore'
import { PageHeader } from '../components/ui/PageHeader'
import { Card, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { cn } from '../utils/cn'

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-800/80 bg-slate-950/40 px-4 py-3">
      <span>
        <span className="block text-sm text-slate-200">{label}</span>
        {description ? <span className="mt-0.5 block text-xs text-slate-500">{description}</span> : null}
      </span>
      <span className="relative inline-flex">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={cn(
            'h-5 w-9 rounded-full border transition-colors duration-200',
            checked ? 'border-cyan-500/50 bg-cyan-500/30' : 'border-slate-700 bg-slate-800',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400/70',
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-0.5 h-4 w-4 rounded-full bg-slate-200 transition-transform duration-200',
            checked ? 'translate-x-[1.15rem]' : 'translate-x-0.5',
          )}
        />
      </span>
    </label>
  )
}

const SHORTCUTS = [
  ['⌘ / Ctrl + K', 'Open command palette'],
  ['N', 'New task'],
  ['T', 'Go to tasks'],
  ['E', 'Go to exams'],
  ['F', 'Start a focus session'],
  ['⌘ / Ctrl + 1…8', 'Jump between pages'],
  ['Esc', 'Close dialogs'],
]

export default function Settings() {
  const { settings, updateSettings, updateNestedSetting, exportData, loadSampleData, clearAllData } = useApp()
  const [confirmClear, setConfirmClear] = useState(false)

  const download = () => {
    const blob = new Blob([JSON.stringify(exportData(), null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `studentos-export-${new Date().toISOString().slice(0, 10)}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Preferences" title="Settings" description="Tune StudentOS to the way you study." />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader title="Appearance" description="StudentOS is designed dark-first." />
          <div className="space-y-3 p-5">
            <Input
              label="Display name"
              value={settings.displayName}
              onChange={(event) => updateSettings({ displayName: event.target.value })}
            />
            <Toggle
              label="Compact density"
              description="Tighter spacing across lists and cards."
              checked={settings.compactDensity}
              onChange={(value) => updateSettings({ compactDensity: value })}
            />
            <Toggle
              label="Reduce motion"
              description="Minimise animations across the interface."
              checked={settings.reducedMotion}
              onChange={(value) => updateSettings({ reducedMotion: value })}
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Notifications" description="What StudentOS should remind you about." />
          <div className="space-y-3 p-5">
            <Toggle
              label="Assignment reminders"
              checked={settings.notifications.assignments}
              onChange={(value) => updateNestedSetting('notifications', 'assignments', value)}
            />
            <Toggle
              label="Exam reminders"
              checked={settings.notifications.exams}
              onChange={(value) => updateNestedSetting('notifications', 'exams', value)}
            />
            <Toggle
              label="Study reminders"
              checked={settings.notifications.study}
              onChange={(value) => updateNestedSetting('notifications', 'study', value)}
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Productivity" description="Defaults for focus sessions." />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <Input
              label="Default focus length (min)"
              type="number"
              min="1"
              max="240"
              value={settings.productivity.defaultFocusMinutes}
              onChange={(event) =>
                updateNestedSetting('productivity', 'defaultFocusMinutes', Number(event.target.value) || 25)
              }
            />
            <Input
              label="Daily study goal (min)"
              type="number"
              min="0"
              max="960"
              value={settings.productivity.dailyGoalMinutes}
              onChange={(event) => updateNestedSetting('productivity', 'dailyGoalMinutes', Number(event.target.value) || 0)}
            />
          </div>
        </Card>

        <Card>
          <CardHeader title="Data" description="Everything is stored locally in your browser." />
          <div className="flex flex-wrap gap-2 p-5">
            <Button variant="secondary" onClick={download}>
              <Download className="h-4 w-4" />
              Export data
            </Button>
            <Button variant="secondary" onClick={loadSampleData}>
              <RefreshCcw className="h-4 w-4" />
              Start with sample data
            </Button>
            <Button variant="danger" onClick={() => setConfirmClear(true)}>
              <Trash2 className="h-4 w-4" />
              Clear local data
            </Button>
          </div>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader title="Keyboard Shortcuts" description="Move without touching the mouse." />
          <ul className="grid gap-2 p-5 sm:grid-cols-2">
            {SHORTCUTS.map(([keys, description]) => (
              <li
                key={keys}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-800/80 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-300"
              >
                <span>{description}</span>
                <kbd className="rounded-md border border-slate-700 bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-400">
                  {keys}
                </kbd>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmClear}
        onClose={() => setConfirmClear(false)}
        onConfirm={clearAllData}
        title="Clear all local data?"
        description="Tasks, exams, subjects, notes and focus history will be removed."
        confirmLabel="Clear data"
      />
    </div>
  )
}
