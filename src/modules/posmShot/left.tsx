import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { BizInfo } from '../../components/BizInfo'
import { ImageMaskWindow } from '../../components/imageMaskWindow'
import { Slider } from '../../components/slider'
import { IPosmShot } from '../../domain'
import {
  selectPosmShot,
  selectPosmShotDetail,
  selectPosmShotIndex,
  selectPosmShots,
} from '../../store/posmShotSlice'
import { twoPoint2Rect } from '../../utils'

const PREFIX = 'PosmShotDetailLeft'

export const PosmShotDetailLeft: React.FC<{
  onClick?: (shot: IPosmShot) => void
}> = ({ onClick }) => {
  const detail = useSelector(selectPosmShotDetail)
  const shots = useSelector(selectPosmShots)
  const index = useSelector(selectPosmShotIndex)
  const shot = useSelector(selectPosmShot)

  const rects = useMemo(() => {
    return detail?.posmshots?.map((p) => twoPoint2Rect(p.position)) || []
  }, [detail?.posmshots])

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-mainSwiper`}>
        {detail && (
          <>
            <ImageMaskWindow
              // src={[detail.thumbnail_url, detail.img_url]}
              src={[detail.img_url]}
              rectangles={rects}
              className={`${PREFIX}-Window`}
              mask={true}
              mode="box"
              drawing={true}
              actives={[
                detail.posmshots.findIndex((s) => s.id === shots[index].id),
              ]}
            />
            <BizInfo
              date={shot?.visit_date}
              name={shot?.posm_name}
              address={`${shot?.store_city}, ${shot?.store_state_or_province}`}
            />
          </>
        )}
      </div>
      <div className={`${PREFIX}-thumbSwiper`}>
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
