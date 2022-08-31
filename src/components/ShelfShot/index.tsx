import React, { useMemo } from 'react'
import { IShelfShot } from '../../domain'
import { mockImgSrcByCount } from '../../mock/img'
import { Gallery } from '../gallery'
import { GalleryImage } from '../gallery/image'

interface IProps {
  month: string
  shots: IShelfShot[]
}

const PREFIX = 'ShelfShotGroup'

export const ShelfShotGroup: React.FC<IProps> = ({ month, shots }) => {
    const srcs = useMemo(() => mockImgSrcByCount(shots.length), [shots.length])

  const Row = ({ index }: { index: number }) => {
    // return <GalleryImage src={shots[index].preview_img_url} alt="" />
    // return <img src={srcs[index]} alt="" />
    return <GalleryImage src={srcs[index]} alt="" />
  }

  return (
    <div className={PREFIX}>
      <div>{`${month}(${shots.length})`}</div>
      <Gallery columnCount={4} total={shots.length}>
        {Row}
      </Gallery>
    </div>
  )
}
