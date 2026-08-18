import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { EmptyState } from '../components/ui/EmptyState'
import { Card } from '../components/ui/Card'
import { buttonClasses } from '../utils/buttonClasses'

export default function NotFound() {
  return (
    <Card>
      <EmptyState
        icon={Compass}
        title="This page does not exist."
        description="The route you tried is not part of StudentOS."
        action={
          <Link to="/dashboard" className={buttonClasses({ size: 'md' })}>
            Back to dashboard
          </Link>
        }
      />
    </Card>
  )
}
