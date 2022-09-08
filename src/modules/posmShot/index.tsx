import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import './index.scss'
import { useDispatch } from 'react-redux'
import {
  fetchPosmShotDetail,
  resetPosmShot,
  updatePosmShot,
} from '../../store/posmShotSlice'
import { IPosmShot } from '../../domain'
import { LR } from '../../components/layout/lr'
import { PosmShotDetailRight } from './right'
import { PosmShotDetailLeft } from './left'

interface IProps {
  shot: IPosmShot
  onClose?: () => void
}

const PREFIX = 'PosmShotDetail'

export const PosmShotDetail: React.FC<IProps> = ({ shot, onClose }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updatePosmShot({ shot }))
    dispatch(fetchPosmShotDetail(shot.img_id) as any)
    return () => {
      dispatch(resetPosmShot() as any)
    }
  }, [dispatch, shot])

  const handleClick = (shot: IPosmShot) => {
    dispatch(updatePosmShot({ shot }))
    dispatch(fetchPosmShotDetail(shot.img_id) as any)
  }

  return (
    <>
      <LR
        className={PREFIX}
        percent={77}
        left={<PosmShotDetailLeft onClick={handleClick} />}
      >
        <PosmShotDetailRight />
      </LR>
      <CloseIcon className={`${PREFIX}-close`} onClick={onClose} />
    </>
  )
}
