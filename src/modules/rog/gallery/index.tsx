import React from 'react'
import { LR } from '../../../components/layout/lr'
import { StoreGalleryLeft } from './left'
import { StoreGalleryRight } from './right'
import './index.scss'

const PREFIX = 'StoreGallery'

export const StoreGallery: React.FC = () => {
  return (
    <LR className={PREFIX} percent={77} left={<StoreGalleryLeft />}>
      <StoreGalleryRight />
    </LR>
  )
}
