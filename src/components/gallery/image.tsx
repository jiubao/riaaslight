import React, { ImgHTMLAttributes, useRef } from 'react'

interface IProps extends ImgHTMLAttributes<any> {
  minHeight?: number
}

export const GalleryImage: React.FC<IProps> = ({
  minHeight = 200,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null)

  const handleLoad = () => {
    if (imgRef.current) {
      const dom = imgRef.current
      const { naturalWidth, naturalHeight } = dom
      const clientWidth = dom.parentElement?.clientWidth
      if (!naturalWidth || !clientWidth) return
      if (naturalHeight / naturalWidth < minHeight / clientWidth) {
        dom.style.height = `${minHeight}px`
        dom.style.width = 'auto'
        dom.style.position = 'absolute'
        dom.style.left = '50%'
        dom.style.transform = 'translateX(-50%)'
      }
    }
  }

  return <img ref={imgRef} onLoad={handleLoad} {...props} alt="" />
}
