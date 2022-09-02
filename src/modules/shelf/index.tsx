import React from 'react'
import { LR } from '../../components/layout/lr'
import { ShelfDetailRight } from './right'
import './index.scss'
import { ShelfDetailLeft } from './left'

const PREFIX = 'ShelfDetail'

export const ShelfDetail: React.FC = () => {
  return (
    <LR className={PREFIX} percent={77} left={<ShelfDetailLeft />}>
      <ShelfDetailRight />
    </LR>
  )
}
