import React from 'react'
import { Gallery } from '../../components/gallery'
import { GalleryImage } from '../../components/gallery/image'
import { IPosmShot } from '../../domain'
// import './index.scss'

interface IProps {
  month: string
  shots: IPosmShot[]
  onClick?: (id: number) => void
}

const PREFIX = 'PosmShotGroup'

export const PosmShotGroup: React.FC<IProps> = ({ month, shots, onClick }) => {
  const Row = ({ index }: { index: number }) => {
    const shot = shots[index]
    return (
      <GalleryImage
        src={shot.thumbnail_url}
        alt=""
        onClick={() => onClick?.(shot.id)}
      />
    )
  }

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-month`} data-month={month}></div>
      <Gallery columnCount={5} total={shots.length} gutter={20}>
        {Row}
      </Gallery>
    </div>
  )
}
