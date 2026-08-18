import { useCallback, useEffect, useRef, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

/**
 * Persistent state backed by localStorage with a safe in-memory fallback.
 * `initializer` may be a value or a factory used only on first load.
 */
export function useLocalStorage(key, initializer) {
  const [value, setValue] = useState(() => {
    const fallback = typeof initializer === 'function' ? initializer() : initializer
    return readStorage(key, fallback)
  })
  const keyRef = useRef(key)

  useEffect(() => {
    keyRef.current = key
  }, [key])

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  const reset = useCallback(() => {
    setValue(typeof initializer === 'function' ? initializer() : initializer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [value, setValue, reset]
}
