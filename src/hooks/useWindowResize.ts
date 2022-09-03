import { useCallback, useEffect } from 'react'
import { on } from '../utils/dom'

export const useWindowResize = (callback: () => void, deps: any[]) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fn = useCallback(callback, [deps])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, [])

  useEffect(() => {
    const off = on(window, 'resize', () => {
      fn()
    })
    return () => {
      off()
    }
  }, [fn])
}
