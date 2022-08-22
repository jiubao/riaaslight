import React from 'react'
import { Gallery } from '../../../components/gallery'
import { mockImgSrcByCount } from '../../../mock/img'

interface IProps {
  id?: string
}

const PREFIX = 'StoreImages'

const TOTAL = 100
const srcs = mockImgSrcByCount(TOTAL)

const Row = ({ index }: { index: number }) => {
  return <img src={`${srcs[index]}/?text=${index}`} alt="" />
}

export const StoreImages: React.FC<IProps> = ({ id }) => {
  return (
    <div className={PREFIX}>
      <Gallery columnCount={4} total={TOTAL} gutter={15}>
        {Row}
      </Gallery>
    </div>
  )
}
