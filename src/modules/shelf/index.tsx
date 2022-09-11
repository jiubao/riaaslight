import React, { useEffect } from 'react'
import { LR } from '../../components/layout/lr'
import './index.scss'
import { ShelfDetailRight } from './right'
import { ShelfDetailLeft } from './left'
import { useDispatch } from 'react-redux'
import { resetShelf } from '../../store/shelfSlice'

const PREFIX = 'ShelfDetail'

interface IProps {
  onClose?: () => void
}

export const ShelfDetail: React.FC<IProps> = ({ onClose }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetShelf())
    }
  }, [dispatch])

  return (
    <LR className={PREFIX} percent={77} left={<ShelfDetailLeft />}>
      <ShelfDetailRight onClose={onClose} />
    </LR>
  )
}
