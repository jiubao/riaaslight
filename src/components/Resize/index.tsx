import React, { useCallback } from 'react'
import ResizeObserver from 'rc-resize-observer'

interface IResizeRect {
  width: number
  height: number
}
interface IProps {
  children?: React.ReactNode
  onResize?: ({ width, height }: IResizeRect) => void
}

const Resize: React.FC<IProps> = React.memo(({ children, onResize }) => {
  const resizeHandler = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      onResize?.({ width, height })
    },
    [onResize]
  )
  return <ResizeObserver onResize={resizeHandler}>{children}</ResizeObserver>
})

export default Resize
