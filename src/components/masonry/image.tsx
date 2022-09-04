import React, { ImgHTMLAttributes, useEffect, useRef } from 'react'

interface IProps extends ImgHTMLAttributes<any> {
  minHeight?: number
}

export const MasonryImage: React.FC<IProps> = ({
  minHeight = 120,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const dom = imgRef.current
    if (!dom) return

    const handleLoad = () => {
      const { naturalWidth, naturalHeight } = dom
      const clientWidth = dom.parentElement?.clientWidth
      if (!naturalWidth || !clientWidth) return
      if (naturalHeight / naturalWidth < minHeight / clientWidth) {
        // console.log(`cw:${clientWidth},nw:${naturalWidth},nh:${naturalHeight}`)
        // console.log(dom)
        dom.style.height = `${minHeight}px`
        dom.style.width = 'auto'
        dom.style.position = 'absolute'
        dom.style.left = '50%'
        dom.style.transform = 'translateX(-50%)'
      }
    }

    dom.addEventListener('load', handleLoad)

    return () => {
      dom.removeEventListener('load', handleLoad)
    }
  }, [minHeight])

  return <img ref={imgRef} alt="" {...props} />
}
