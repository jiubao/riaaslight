import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { MaskWindow } from './window'
import './index.scss'
import { RectType } from '../../domain/shape'
import { PropsWithClassName } from '../../domain/common'
import classNames from 'classnames'
import {
  commonTransformMatrix,
  IdentityTransformMatrix2D,
  TransformMatrix2D,
} from '../../utils/matrix'
import { SpotWindow } from './spotWindow'
import { loadImageByOrder } from '../../utils/image'

interface IProps {
  src: string[]
  rectangles: RectType[]
  mask?: boolean
  mode?: 'box' | 'spot'
  drawing?: boolean
}

const PREFIX = 'ImageMaskWindow'

export const ImageMaskWindow: React.FC<PropsWithClassName<IProps>> = React.memo(
  ({
    className,
    src,
    rectangles,
    mask = true,
    mode = 'box',
    drawing = true,
  }) => {
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState<HTMLImageElement>()
    const [nativeSrc, setSrc] = useState('')
    // const [imageSize, setImageSize] = useState<ISize>({ width: 0, height: 0 })
    // const [divSize, setDivSize] = useState<ISize>({ width: 0, height: 0 })
    const divRef = useRef<HTMLDivElement>(null)

    const [wrapStyle, setWrapStyle] = useState<CSSProperties>()
    const [zoomStyle, setZoomStyle] = useState<CSSProperties>()

    const setStyle = useCallback(
      (iw: number, ih: number, dw: number, dh: number) => {
        // console.log('l2...')
        // const { width: iw, height: ih } = imageSize
        // const { width: dw, height: dh } = divSize
        // const iw = imageSize.width,
        //   ih = imageSize.height
        // const dw = divSize.width,
        //   dh = divSize.height
        if ([iw, ih, dw, dh].indexOf(0) >= 0) return

        console.log('l3...')
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
      },
      []
    )

    useEffect(() => {
      if (!divRef.current) return
      const div = divRef.current

      // const img = new Image()
      // const off = on(img, 'load', () => {
      //   // console.log('l1...')
      //   setLoaded(true)
      //   setImage(img)
      //   setStyle(
      //     img.naturalWidth,
      //     img.naturalHeight,
      //     div.clientWidth,
      //     div.clientHeight
      //   )
      // })
      // img.src = src

      // return () => {
      //   off()
      // }
      loadImageByOrder(src).then((result) => {
        if (result) {
          // console.log('l1...')
          const { img } = result
          setLoaded(true)
          setImage(img)
          setSrc(result.src)
          setStyle(
            img.naturalWidth,
            img.naturalHeight,
            div.clientWidth,
            div.clientHeight
          )
        }
      })
    }, [setStyle, src])

    const Item = useMemo(
      () => (mode === 'box' ? MaskWindow : SpotWindow),
      [mode]
    )

    return (
      <div className={classNames(PREFIX, className)} ref={divRef}>
        {loaded && (
          <div className={`${PREFIX}-wrapper`} style={wrapStyle}>
            <img src={nativeSrc} alt="" />
            {drawing && (
              <>
                <div
                  className={classNames(`${PREFIX}-Mask`, {
                    'is-masked': rectangles.length && mask,
                  })}
                ></div>
                <div className={`${PREFIX}-Zoom`} style={zoomStyle}>
                  {rectangles.map((rect, index) => (
                    <Item
                      key={index}
                      image={image as HTMLImageElement}
                      // rect={JSON.stringify(rect)}
                      rect={rect}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    )
  }
)
