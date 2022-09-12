import React, { useEffect, useRef } from 'react'
import { on } from '../../utils/dom'
import {
  IdentityTransformMatrix2D,
  multiplyMatrices,
  revertMatrix,
  TransformMatrix2D,
} from '../../utils/matrix'
import './index.scss'

interface IProps {
  src: string
  zoom?: number
}

const PREFIX = 'ZoomWindow'

const ZOOM = 2.5

export const ZoomWindow: React.FC<IProps> = ({ src, zoom = ZOOM }) => {
  const coverRef = useRef<HTMLDivElement>(null)
  const targetClipRef = useRef<HTMLDivElement>(null)
  const borderClipRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const cover = coverRef.current
    const target = targetRef.current
    const targetClip = targetClipRef.current
    const borderClip = borderClipRef.current
    if (!cover || !target || !targetClip || !borderClip) return

    const render = (x: number, y: number) => {
      const matrixPan: TransformMatrix2D = [1, 0, 0, 1, x, y]
      const matrixZoom: TransformMatrix2D = [zoom, 0, 0, zoom, 0, 0]
      const matrix = multiplyMatrices(
        matrixPan,
        multiplyMatrices(
          matrixZoom,
          multiplyMatrices(revertMatrix(matrixPan), IdentityTransformMatrix2D)
        )
      )
      target.style.transform = `matrix(${matrix.join(',')})`
      targetClip.style.clipPath = `circle(150px at ${x}px ${y}px)`
      borderClip.style.clipPath = `circle(152px at ${x}px ${y}px)`
    }

    render(152, 152)

    const off = on(cover, 'mousemove', (event: Event) => {
      const { offsetX, offsetY } = event as MouseEvent
      render(offsetX, offsetY)
    })
    return () => {
      off()
    }
  }, [zoom])

  return (
    <div className={`${PREFIX} fulfilled`}>
      <div className={`${PREFIX}-cover fulfilled`} ref={coverRef}></div>

      <div className={`${PREFIX}-borderClip fulfilled`} ref={borderClipRef}>
        <div className={`${PREFIX}-targetClip fulfilled`} ref={targetClipRef}>
          <img className={`${PREFIX}-img`} src={src} alt="" ref={targetRef} />
        </div>
      </div>
    </div>
  )
}
