import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { IStroke, RectType } from '../../domain/shape'
import { CanvasHelper } from '../../utils/canvas'

interface IProps {
  image?: HTMLImageElement
  // rect: RectType
  rect: string
  stroke?: IStroke
}

const PREFIX = 'ImageMaskWindow-Window'

export const MaskWindow: React.FC<IProps> = React.memo<IProps>(
  ({ image, rect, stroke = { size: 3, color: '#ffffff' } }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const helperRef = useRef<CanvasHelper | null>(null)
    // const [style, setStyle] = useState<CSSProperties>()

    useEffect(() => {
      if (canvasRef.current && image) {
        const canvas = canvasRef.current
        const helper = (helperRef.current = new CanvasHelper(canvas))

        const { naturalWidth, naturalHeight } = image
        const [x, y, w, h] = JSON.parse(rect) as RectType
        const { size, color } = stroke
        const left = x * naturalWidth
        const top = y * naturalHeight
        const width = w * naturalWidth
        const height = h * naturalHeight
        canvas.width = width
        canvas.height = height
        helper.drawImage(image, [left, top, width, height])
        // setStyle({
        //   border: `solid ${size}px ${color}`,
        //   transform: `translate3d(${left - size}px, ${top - size}px, 0)`,
        // })
        canvas.style.border = `solid ${size}px ${color}`
        canvas.style.transform = `translate3d(${left - size}px, ${
          top - size
        }px, 0)`
      }
    }, [image, rect, stroke])

    return <canvas ref={canvasRef} className={PREFIX} />
  }
)
