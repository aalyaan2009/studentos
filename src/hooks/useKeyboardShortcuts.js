import { useEffect } from 'react'

function isEditableTarget(target) {
  if (!target) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

/**
 * Registers global shortcuts. Keys are matched case-insensitively and are
 * ignored while the user types in a field.
 */
export function useKeyboardShortcuts(handlers) {
  useEffect(() => {
    const onKeyDown = (event) => {
      const combo = `${event.metaKey || event.ctrlKey ? 'mod+' : ''}${event.key.toLowerCase()}`
      const handler = handlers[combo]
      if (!handler) return
      const modified = event.metaKey || event.ctrlKey
      if (!modified && isEditableTarget(event.target)) return
      event.preventDefault()
      handler(event)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handlers])
}
