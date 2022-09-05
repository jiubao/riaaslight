import React, { useRef } from 'react'
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

const PREFIX = 'ShelfDetailLeft'

export const ShelfDetailLeft: React.FC = () => {
  const dispatch = useDispatch()
  const swiperRef = useRef<SwiperClass>()
  // const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)
  // const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null)
  const shots = useSelector(selectShelfShots)
  const positions = useSelector(selectSelectedBrandsPositions)
  const shelfIndex = useSelector(selectShelfIndex)

  const handleSwiper = (swiper: SwiperClass) => {
    ;(window as any).si = swiperRef.current = swiper
  }

  const handleSlideChagne = () => {
    const swiper = swiperRef.current
    if (!swiper) return

    dispatch(resetShelf() as any)
    if (swiper?.activeIndex !== undefined) {
      dispatch(fetchShelfByIndex(swiper.activeIndex) as any)
    }
  }

  return (
    <div className={PREFIX}>
      {/* <Swiper
        className={`${PREFIX}-mainSwiper`}
        onSwiper={setMainSwiper}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        initialSlide={shelfIndex}
        onSlideChange={handleSlideChagne}
      >
        {shots.map((shot, index) => (
          <SwiperSlide key={shot.id}>
            <ImageMaskWindow
              src={shot.thumbnail_url}
              rectangles={positions}
              className={`${PREFIX}-Window`}
              mask={false}
              mode="spot"
              drawing={shelfIndex === index}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
      <div className={`${PREFIX}-mainSwiper`}>
        <ImageMaskWindow
          src={[shots[shelfIndex]?.preview_img_url, shots[shelfIndex]?.img_url]}
          rectangles={positions}
          className={`${PREFIX}-Window`}
          mask={false}
          mode="spot"
          drawing={true}
        />
      </div>
      {/* <div className={`${PREFIX}-thumbSwiper`}> */}
      <Swiper
        className={`${PREFIX}-thumbSwiper`}
        onSwiper={handleSwiper}
        spaceBetween={10}
        slidesPerView={7}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        initialSlide={shelfIndex}
        slideToClickedSlide={true}
        slideActiveClass="swiper-slide-thumb-active"
        onSlideChange={handleSlideChagne}
        centeredSlides={true}
        centeredSlidesBounds={true}
      >
        {shots.map((shot) => (
          <SwiperSlide key={shot.id}>
            <img src={shot.thumbnail_url} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* </div> */}
    </div>
  )
}
