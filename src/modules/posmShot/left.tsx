import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageMaskWindow } from '../../components/imageMaskWindow'
import { Slider } from '../../components/slider'
import {
  fetchPosmDetailShots,
  resetPosmShot,
  selectPosmShotDetail,
  selectPosmShotIndex,
  selectPosmShots,
} from '../../store/posmShotSlice'

const PREFIX = 'PosmShotDetailLeft'

export const PosmShotDetailLeft: React.FC = () => {
  const dispatch = useDispatch()
  const detail = useSelector(selectPosmShotDetail)
  const shots = useSelector(selectPosmShots)
  const index = useSelector(selectPosmShotIndex)

  useEffect(() => {
    dispatch(fetchPosmDetailShots() as any)
    return () => {
      dispatch(resetPosmShot() as any)
    }
  }, [dispatch])

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-mainSwiper`}>
        {detail && (
          <ImageMaskWindow
            src={[detail.thumbnail_url, detail.img_url]}
            rectangles={detail.posmshots?.map((p) => p.position) || []}
            className={`${PREFIX}-Window`}
            mask={false}
            mode="spot"
            drawing={true}
          />
        )}
      </div>
      <div className={`${PREFIX}-thumbSwiper`}>
        <Slider
          srcs={shots.map((s) => s.thumbnail_url)}
          index={index}
          // onClick={handleChange}
        />
      </div>
    </div>
  )
}
