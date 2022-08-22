import React from 'react'
import { LR } from '../../../components/layout/lr'
import { StoreImages } from './images'
import { StoreInfo } from './info'
import './index.scss'

const PREFIX = 'Store'

export const Store: React.FC = () => {
  return (
    <LR percent={26} className={PREFIX} left={<StoreInfo />}>
      <StoreImages />
    </LR>
  )
}
