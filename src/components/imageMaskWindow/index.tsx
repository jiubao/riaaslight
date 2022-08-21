import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { MaskWindow } from './window'
import './index.scss'
import { on } from '../../utils/dom'
import { ISize, RectType } from '../../domain/shape'
import { PropsWithClassName } from '../../domain/common'
import classNames from 'classnames'
import {
  commonTransformMatrix,
  IdentityTransformMatrix2D,
  TransformMatrix2D,
} from '../../utils/matrix'

interface IProps {
  src: string
  rectangles: RectType[]
}

const PREFIX = 'ImageMaskWindow'

export const ImageMaskWindow: React.FC<PropsWithClassName<IProps>> = ({
  className,
  src,
  rectangles,
}) => {
  const [loaded, setLoaded] = useState(false)
  const [image, setImage] = useState<HTMLImageElement>()
  const [imageSize, setImageSize] = useState<ISize>({ width: 0, height: 0 })
  const [divSize, setDivSize] = useState<ISize>({ width: 0, height: 0 })
  const divRef = useRef<HTMLDivElement>(null)

  const [wrapStyle, setWrapStyle] = useState<CSSProperties>()
  const [zoomStyle, setZoomStyle] = useState<CSSProperties>()

  useEffect(() => {
    if (!divRef.current) return
    const div = divRef.current

    const img = new Image()
    const off = on(img, 'load', () => {
      setLoaded(true)
      setImage(img)
      setImageSize({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
      setDivSize({
        width: div.scrollWidth,
        height: div.scrollHeight,
      })
    })
    img.src = src

    return () => {
      off()
    }
  }, [src])

  useEffect(() => {
    const { width: iw, height: ih } = imageSize
    const { width: dw, height: dh } = divSize
    if ([iw, ih, dw, dh].indexOf(0) >= 0) return

    const ir = iw / ih
    const dr = dw / dh
    const center = [1, 0, 0, 1, -iw / 2, -ih / 2] as TransformMatrix2D
    let zoom = IdentityTransformMatrix2D
    if (dr >= ir) {
      const w = dh * ir
      setWrapStyle({
        width: `${w}px`,
        height: `${dh}px`,
        transform: `translate3d(${(dw - w) / 2}px, 0, 0)`,
      })

      zoom = [dh / ih, 0, 0, dh / ih, 0, 0] as TransformMatrix2D
    } else {
      const h = dw / ir
      setWrapStyle({
        width: `${dw}px`,
        height: `${h}px`,
        transform: `translate3d(0, ${(dh - h) / 2}px, 0)`,
      })

      zoom = [dw / iw, 0, 0, dw / iw, 0, 0] as TransformMatrix2D
    }

    setZoomStyle({
      width: `${iw}px`,
      height: `${ih}px`,
      transform: `matrix(${commonTransformMatrix(
        IdentityTransformMatrix2D,
        zoom,
        center
      ).join(',')})`,
    })
  }, [divSize, imageSize])

  return (
    <div className={classNames(PREFIX, className)} ref={divRef}>
      {loaded && (
        <div className={`${PREFIX}-wrapper`} style={wrapStyle}>
          <img src={src} alt="" />
          <div className={`${PREFIX}-Mask`}></div>
          <div className={`${PREFIX}-Zoom`} style={zoomStyle}>
            {rectangles.map((rect, index) => (
              <MaskWindow
                key={JSON.stringify(rect)}
                image={image as HTMLImageElement}
                rect={JSON.stringify(rect)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
