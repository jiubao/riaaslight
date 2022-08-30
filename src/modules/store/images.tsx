import React from 'react'
import { useSelector } from 'react-redux'
import { Gallery } from '../../components/gallery'
// import { mockImgSrcByCount } from '../../mock/img'
import { selectShelfShots } from '../../store/storeSlice'

interface IProps {
  id?: string
}

const PREFIX = 'StoreImages'

// const TOTAL = 100
// const srcs = mockImgSrcByCount(TOTAL)

// const Row = ({ index }: { index: number }) => {
//   return <img src={`${srcs[index]}/?text=${index}`} alt="" />
// }

export const StoreImages: React.FC<IProps> = ({ id }) => {
  const shelfShots = useSelector(selectShelfShots)

  const Row = ({ index }: { index: number }) => {
    return <img src={shelfShots[index].preview_img_url} alt="" />
  }

  return (
    <div className={PREFIX}>
      <Gallery columnCount={4} total={shelfShots.length} gutter={15}>
        {Row}
      </Gallery>
    </div>
  )
}
