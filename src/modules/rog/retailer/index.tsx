import React from 'react'
import { LR } from '../../../components/layout/lr'
import { RetailerImages } from './images'
import { RetailerInfo } from './info'
import './index.scss'

interface IProps {
  id: string
}

const PREFIX = 'RogDetail'

export const Retailer: React.FC<IProps> = ({ id }) => {
  return (
    <LR percent={26} className={PREFIX} left={<RetailerInfo />}>
      <RetailerImages />
    </LR>
  )
}
