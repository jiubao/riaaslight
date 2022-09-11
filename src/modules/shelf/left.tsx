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
  resetShelfSelection,
  selectSelectedBrandsPositions,
  selectShelfIndex,
} from '../../store/shelfSlice'
import { Slider } from '../../components/slider'
import { BizInfo } from '../../components/BizInfo'

const PREFIX = 'ShelfDetailLeft'

export const ShelfDetailLeft: React.FC = () => {
  const dispatch = useDispatch()
  const shots = useSelector(selectShelfShots)
  const store = useSelector(selectStoreDetail)
  const positions = useSelector(selectSelectedBrandsPositions)
  const shelfIndex = useSelector(selectShelfIndex)

  const handleChange = (index: number) => {
    if (index >= 0) {
      dispatch(resetShelfSelection())
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
        <BizInfo
          date={shots[shelfIndex]?.visit_date}
          name={store?.store_name}
          address={`${store?.store_address}, ${store?.store_city}, ${store?.store_country}`}
        />
      </div>
      <div className={`${PREFIX}-thumbSwiper`}>
        <Slider total={shots.length} index={shelfIndex}>
          {({ index }) => (
            <img
              key={index}
              src={shots[index]?.thumbnail_url}
              alt=""
              onClick={() => handleChange(index)}
            />
          )}
        </Slider>
      </div>
    </div>
  )
}
