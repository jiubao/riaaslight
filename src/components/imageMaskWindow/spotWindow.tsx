import React, { useEffect, useRef } from 'react'
import { IStroke, RectType } from '../../domain/shape'
import { CanvasHelper } from '../../utils/canvas'

interface IProps {
  image?: HTMLImageElement
  rect: RectType
  // rect: string
  stroke?: IStroke
  zoom: number
  active: boolean
}

const PREFIX = 'ImageMaskWindow-SpotWindow'

// const size = 30

export const SpotWindow: React.FC<IProps> = React.memo<IProps>(
  ({ image, rect, zoom, stroke = { size: 8, color: '#ffffff' }, active }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const helperRef = useRef<CanvasHelper | null>(null)

    useEffect(() => {
      if (canvasRef.current && image) {
        const canvas = canvasRef.current
        const helper = (helperRef.current = new CanvasHelper(canvas))

        const { naturalWidth, naturalHeight } = image
        // const [x, y, w, h] = JSON.parse(rect) as RectType
        const [x, y, w, h] = rect
        // const { size, color } = stroke
        const size = naturalWidth / 300
        const left = x * naturalWidth
        const top = y * naturalHeight
        const width = w * naturalWidth
        const height = h * naturalHeight
        canvas.width = width + size * 2
        canvas.height = height + size * 2
        // helper.drawImage(image, [left, top, width, height])
        helper.drawRect(
          [size, size, width, height],
          'rgba(251, 104, 104, 0.59)'
        )
        // helper.drawRect([0, 0, size, size * 4], '#ff0000')
        // helper.drawRect([size, 0, size * 3, size], '#ff0000')
        helper.stroke([size, size, width, height], '#ff0000', size)
        // canvas.style.border = `solid ${size}px ${color}`
        canvas.style.transform = `translate3d(${left - size}px, ${
          top - size
        }px, 0)`
      }
    }, [image, rect])

    return <canvas ref={canvasRef} className={PREFIX} />
  }
)
