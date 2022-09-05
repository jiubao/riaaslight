import React, { useEffect, useRef } from 'react'
import { PositionType } from '../../domain/shape'
import { CanvasHelper } from '../../utils/canvas'
import { on } from '../../utils/dom'
import './index.scss'

interface IProps {
  src: string
  position: PositionType
}

const PREFIX = 'CropImage'

export const CropImage: React.FC<IProps> = React.memo(({ src, position }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const helper = new CanvasHelper(canvas)
    const [l, t, r, b] = position
    const w = r - l
    const h = b - t
    const img = new Image()
    const off = on(img, 'load', () => {
      const { naturalHeight, naturalWidth } = img
      const left = naturalWidth * l
      const top = naturalHeight * t
      const width = naturalWidth * w
      const height = naturalHeight * h
      canvas.width = width
      canvas.height = height
      helper.drawImage(img, [left, top, width, height])
    })
    img.src = src

    return () => {
      off()
    }
  }, [position, src])

  return <canvas className={PREFIX} ref={canvasRef} />
})
