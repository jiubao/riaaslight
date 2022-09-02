import React from 'react'
import { useSelector } from 'react-redux'
import { IShelfShotDetail } from '../../domain'
import { selectShelfShotDetail } from '../../store/shelfSlice'
import './index.scss'

const PREFIX = 'ShelfDetail'

export const ShelfDetail: React.FC = () => {
  const detail = useSelector(selectShelfShotDetail) as IShelfShotDetail

  return (
    <div className={PREFIX}>
      <div>{detail.id}</div>
    </div>
  )
}
