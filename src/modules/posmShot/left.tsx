import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ImageMaskWindow } from '../../components/imageMaskWindow'
import { Slider } from '../../components/slider'
import { IPosmShot } from '../../domain'
import {
  selectPosmShotDetail,
  selectPosmShotIndex,
  selectPosmShots,
} from '../../store/posmShotSlice'
import { twoPoint2Rect } from '../../utils'

const PREFIX = 'PosmShotDetailLeft'

export const PosmShotDetailLeft: React.FC<{
  onClick?: (shot: IPosmShot) => void
}> = ({ onClick }) => {
  // const dispatch = useDispatch()
  const detail = useSelector(selectPosmShotDetail)
  const shots = useSelector(selectPosmShots)
  const index = useSelector(selectPosmShotIndex)

  const rects = useMemo(() => {
    return detail?.posmshots?.map((p) => twoPoint2Rect(p.position)) || []
  }, [detail?.posmshots])

  // useEffect(() => {
  //   dispatch(fetchPosmDetailShots() as any)
  //   return () => {
  //     dispatch(resetPosmShot() as any)
  //   }
  // }, [dispatch])

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-mainSwiper`}>
        {detail && (
          <ImageMaskWindow
            // src={[detail.thumbnail_url, detail.img_url]}
            src={[detail.img_url]}
            // rectangles={detail.posmshots?.map((p) => p.position) || []}
            rectangles={rects}
            className={`${PREFIX}-Window`}
            mask={true}
            mode="box"
            drawing={true}
            actives={[
              detail.posmshots.findIndex((s) => s.id === shots[index].id),
            ]}
            // actives={[detail.posmshots.]}
          />
        )}
      </div>
      <div className={`${PREFIX}-thumbSwiper`}>
        {/* <Slider
          srcs={shots.map((s) => s.crop_url)}
          index={index}
          onClick={handleChange}
        /> */}
        <Slider total={shots.length} index={index}>
          {({ index }) => (
            <img
              key={index}
              src={shots[index]?.crop_url}
              alt=""
              onClick={() => onClick?.(shots[index])}
            />
          )}
        </Slider>
      </div>
    </div>
  )
}
