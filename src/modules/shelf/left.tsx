import React from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { ImageMaskWindow } from '../../components/imageMaskWindow'
import { selectShelfShots, selectStoreDetail } from '../../store/storeSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchShelfByIndex,
  resetShelf,
  selectSelectedBrandsPositions,
  selectShelfIndex,
} from '../../store/shelfSlice'
import { ShelfShotInfo } from './info'
import { Slider } from '../../components/slider'

const PREFIX = 'ShelfDetailLeft'

export const ShelfDetailLeft: React.FC = () => {
  const dispatch = useDispatch()
  const shots = useSelector(selectShelfShots)
  const store = useSelector(selectStoreDetail)
  const positions = useSelector(selectSelectedBrandsPositions)
  const shelfIndex = useSelector(selectShelfIndex)

  const handleChange = (index: number) => {
    if (index >= 0) {
      dispatch(resetShelf() as any)
      dispatch(fetchShelfByIndex(index) as any)
    }
  }

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-mainSwiper`}>
        <ImageMaskWindow
          src={[shots[shelfIndex]?.preview_img_url, shots[shelfIndex]?.img_url]}
          rectangles={positions}
          className={`${PREFIX}-Window`}
          mask={false}
          mode="spot"
          drawing={true}
        />
        <ShelfShotInfo shelfShot={shots[shelfIndex]} store={store} />
      </div>
      <div className={`${PREFIX}-thumbSwiper`}>
        <Slider
          srcs={shots.map((s) => s.thumbnail_url)}
          index={shelfIndex}
          onClick={handleChange}
        />
      </div>
    </div>
  )
}
