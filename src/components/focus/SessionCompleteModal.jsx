import { CheckCircle2 } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

export function SessionCompleteModal({ open, onClose, minutes, streak }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Focus session complete."
      size="sm"
      footer={
        <div className="flex justify-end">
          <Button onClick={onClose}>Continue</Button>
        </div>
      }
    >
      <div className="flex flex-col items-center py-2 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-400" aria-hidden="true" />
        <p className="mt-4 text-lg font-semibold text-slate-100">{minutes} minutes of deep work.</p>
        <p className="mt-1 text-sm text-slate-500">
          {streak > 1 ? `That is a ${streak} day study streak. Keep the momentum going.` : 'Logged to your study history.'}
        </p>
      </div>
    </Modal>
  )
}
