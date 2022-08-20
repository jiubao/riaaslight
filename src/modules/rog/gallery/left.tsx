import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { FreeMode, Navigation, Thumbs, Swiper as SwiperClass } from 'swiper'
import { mockFixedSrcs } from '../../../mock/img'

const PREFIX = 'RetailerGalleryLeft'

const imgs = mockFixedSrcs(20, 1000, 700)
imgs.splice(
  2,
  0,
  'https://th.bing.com/th/id/R.494cb15458deadb51a4f73c883501e88?rik=k50sEz0VtWq5KA&riu=http%3a%2f%2fpic110.huitu.com%2fres%2f20180928%2f450439_20180928132030371060_1.jpg&ehk=kdKA53ohpB0YYNarNcjHTne2UfSufDggGSU3rd3vs6U%3d&risl=&pid=ImgRaw&r=0',
  'https://th.bing.com/th/id/OIP.yI-HVwA8x56QQhrBID8nagHaJ4?pid=ImgDet&rs=1',
  'https://th.bing.com/th/id/R.7718c6d8a04568a1a954981df9eba2c5?rik=yXegk14b%2fRupog&riu=http%3a%2f%2fpic116.huitu.com%2fres%2f20190401%2f1064195_20190401115725030070_1.jpg&ehk=2%2fk0O4qZcyb1ihdmwqVl8fnFRc0Jowe3pejuSzrZTU8%3d&risl=&pid=ImgRaw&r=0',
  'https://th.bing.com/th/id/R.18aaa2e072f90b0a10ec30523c4a1d57?rik=uXFP3o%2bDhxglzw&riu=http%3a%2f%2fpic.ntimg.cn%2ffile%2f20191125%2f23472843_162235820084_2.jpg&ehk=zbrnhYuUHcp6%2fYd5%2bv7xNKmLQ7U2O19IG9fDXGg8tuc%3d&risl=&pid=ImgRaw&r=0',
  'https://th.bing.com/th/id/R.201f82ae19e983a0d704f040f5c09b89?rik=r%2bqLEYYE9c1UGQ&riu=http%3a%2f%2fimg.daimg.com%2fuploads%2fallimg%2f200901%2f1-200Z11H134.jpg&ehk=pjJ9pkj%2b%2fQMBpnFO7os%2b4z2IGDopxjYmhIGroPQZArg%3d&risl=&pid=ImgRaw&r=0'
)

export const RetailerGalleryLeft: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null)

  // const handleSwiper = (instance: SwiperClass) => {
  //   instance.originalParams = instance.originalParams || {}
  //   setThumbsSwiper(instance)
  // }

  return (
    <div className={PREFIX}>
      <Swiper
        spaceBetween={10}
        // navigation={true}
        // thumbs={{ swiper: thumbsSwiper }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imgs.map((img, index) => (
          <SwiperSlide>
            <img src={`${img}/?text=${index}`} alt="" />
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
        {imgs.map((img, index) => (
          <SwiperSlide>
            <img src={`${img}/?text=${index}`} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
