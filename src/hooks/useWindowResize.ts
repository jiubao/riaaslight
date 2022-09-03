import { useEffect } from 'react'
import { on } from '../utils/dom'

export const useWindowResize = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [callback])

  useEffect(() => {
    const off = on(window, 'resize', () => {
      callback()
    })
    return () => {
      off()
    }
  }, [callback])
}
