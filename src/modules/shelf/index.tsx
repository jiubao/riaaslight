import React from 'react'
import { LR } from '../../components/layout/lr'
import { StoreGalleryLeft } from '../rog/gallery/left'
import { ShelfDetailRight } from './right'
import './index.scss'

const PREFIX = 'ShelfDetail'

export const ShelfDetail: React.FC = () => {
  // const detail = useSelector(selectShelfShotDetail)!

  return (
    <LR className={PREFIX} percent={77} left={<StoreGalleryLeft />}>
      <ShelfDetailRight />
    </LR>
  )
}
