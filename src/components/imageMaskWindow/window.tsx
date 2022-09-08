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

const PREFIX = 'ImageMaskWindow-Window'

export const MaskWindow: React.FC<IProps> = React.memo<IProps>(
  ({ image, rect, zoom, stroke = { size: 50, color: '#ffffff' }, active }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const helperRef = useRef<CanvasHelper | null>(null)

    useEffect(() => {
      if (canvasRef.current && image) {
        const canvas = canvasRef.current
        const helper = (helperRef.current = new CanvasHelper(canvas))

        const { naturalWidth, naturalHeight } = image
        // const [x, y, w, h] = JSON.parse(rect) as RectType
        const size = 2 / zoom
        const [x, y, w, h] = rect
        let { color } = stroke
        if (active) color = '#FFA800'
        const left = x * naturalWidth
        const top = y * naturalHeight
        const width = w * naturalWidth
        const height = h * naturalHeight
        // naturalWidth > naturalHeight
        //   ? naturalWidth / 400
        //   : naturalHeight / 300
        canvas.width = width
        canvas.height = height
        helper.drawImage(image, [left, top, width, height])
        canvas.style.border = `solid ${size}px ${color}`
        canvas.style.transform = `translate3d(${left - size}px, ${
          top - size
        }px, 0)`
      }
    }, [active, image, rect, stroke, zoom])

    return <canvas ref={canvasRef} className={PREFIX} />
  }
)
