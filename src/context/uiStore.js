import { createContext, useContext } from 'react'

export const UiContext = createContext(null)

export function useUi() {
  const context = useContext(UiContext)
  if (!context) throw new Error('useUi must be used inside <AppShell>')
  return context
}
