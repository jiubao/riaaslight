import React from 'react'
import { LR } from '../../../components/layout/lr'
import { RetailerGalleryLeft } from './left'
import { RetailerGalleryRight } from './right'
import './index.scss'

const PREFIX = 'RetailerGallery'

export const RetailerGallery: React.FC = () => {
  return (
    <LR className={PREFIX} percent={77} left={<RetailerGalleryLeft />}>
      <RetailerGalleryRight />
    </LR>
  )
}
