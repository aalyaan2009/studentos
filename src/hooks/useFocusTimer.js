import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Countdown timer driven by wall-clock deltas so it stays accurate when the
 * tab is throttled. `onComplete` fires once per finished session.
 */
export function useFocusTimer({ initialMinutes = 25, onComplete } = {}) {
  const [durationMinutes, setDurationMinutes] = useState(initialMinutes)
  const [remaining, setRemaining] = useState(initialMinutes * 60)
  const [running, setRunning] = useState(false)
  const deadlineRef = useRef(null)
  const completeRef = useRef(onComplete)

  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (!running) return undefined
    const tick = () => {
      const secondsLeft = Math.max(0, Math.round((deadlineRef.current - Date.now()) / 1000))
      setRemaining(secondsLeft)
      if (secondsLeft === 0) {
        setRunning(false)
        deadlineRef.current = null
        completeRef.current?.(durationMinutes)
      }
    }
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [durationMinutes, running])

  const start = useCallback(() => {
    setRunning((current) => {
      if (current) return current
      deadlineRef.current = Date.now() + remaining * 1000
      return true
    })
  }, [remaining])

  const pause = useCallback(() => setRunning(false), [])

  const reset = useCallback(
    (minutes = durationMinutes) => {
      setRunning(false)
      deadlineRef.current = null
      setDurationMinutes(minutes)
      setRemaining(minutes * 60)
    },
    [durationMinutes],
  )

  const total = durationMinutes * 60
  return {
    durationMinutes,
    remaining,
    running,
    progress: total === 0 ? 0 : (total - remaining) / total,
    start,
    pause,
    reset,
    setDuration: reset,
  }
}
