import React, { ImgHTMLAttributes, useEffect, useRef } from 'react'
import { IMAGE_MIN_HEIGHT } from '.'
import { on } from '../../utils/dom'

const PREFIX = 'MasonryImage'

// interface IProps extends ImgHTMLAttributes<any> {
//   minHeight?: number
// }

export const MasonryImage: React.FC<ImgHTMLAttributes<any>> = ({
  ...props
}) => {
  const divRef = useRef<HTMLImageElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const dom = imgRef.current
    const wrap = divRef.current
    if (!dom || !wrap) return

    const handleLoad = () => {
      const { naturalWidth, naturalHeight } = dom
      const clientWidth = dom.parentElement?.clientWidth
      if (!naturalWidth || !clientWidth) return
      if (naturalHeight / naturalWidth < IMAGE_MIN_HEIGHT / clientWidth) {
        // console.log(`cw:${clientWidth},nw:${naturalWidth},nh:${naturalHeight}`)
        // console.log(dom)
        dom.style.height = `${IMAGE_MIN_HEIGHT}px`
        dom.style.width = 'auto'
        dom.style.position = 'absolute'
        dom.style.left = '50%'
        dom.style.transform = 'translateX(-50%)'
        wrap.style.position = 'absolute'
      }
    }

    const off = on(dom, 'load', handleLoad)

    return () => {
      off()
    }
  }, [])

  return (
    <div className={PREFIX} ref={divRef}>
      <img ref={imgRef} alt="" {...props} />
    </div>
  )
}
