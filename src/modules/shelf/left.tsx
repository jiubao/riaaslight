import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs, Swiper as SwiperClass } from 'swiper'
import { ImageMaskWindow } from '../../components/imageMaskWindow'
import { selectShelfShots } from '../../store/storeSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchShelfByIndex,
  resetShelf,
  selectSelectedBrandsPositions,
  selectShelfIndex,
} from '../../store/shelfSlice'

const PREFIX = 'StoreGalleryLeft'

export const ShelfDetailLeft: React.FC = () => {
  const dispatch = useDispatch()
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null)
  const shots = useSelector(selectShelfShots)
  const positions = useSelector(selectSelectedBrandsPositions)
  const index = useSelector(selectShelfIndex)

  // const handleSwiper = (instance: SwiperClass) => {
  //   instance.originalParams = instance.originalParams || {}
  //   setThumbsSwiper(instance)
  // }

  const handleSlideChagne = () => {
    console.log('...')
    console.log(mainSwiper?.activeIndex)
    dispatch(resetShelf() as any)
    if (mainSwiper?.activeIndex !== undefined) {
      dispatch(fetchShelfByIndex(mainSwiper.activeIndex) as any)
    }
  }

  return (
    <div className={PREFIX}>
      <Swiper
        onSwiper={setMainSwiper}
        spaceBetween={10}
        // navigation={true}
        // thumbs={{ swiper: thumbsSwiper }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        initialSlide={index}
        onSlideChange={handleSlideChagne}
      >
        {shots.map((shot) => (
          <SwiperSlide key={shot.id}>
            {/* <img src={shot.preview_img_url} alt="" /> */}
            <ImageMaskWindow
              src={shot.preview_img_url}
              rectangles={positions}
              className={`${PREFIX}-Window`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={7}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {shots.map((shot) => (
          <SwiperSlide key={shot.id}>
            <img src={shot.preview_img_url} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
