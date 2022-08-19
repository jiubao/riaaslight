import React from 'react'
import { LR } from '../../../components/layout/lr'
import { RogDetailRight } from './right'
import './index.scss'
import { RogDetailLeft } from './left'

interface IProps {
  id: string
}

const PREFIX = 'RogDetail'

export const RogDetail: React.FC<IProps> = ({ id }) => {
  return (
    <LR percent={26} className={PREFIX} left={<RogDetailLeft />}>
      <RogDetailRight />
    </LR>
  )
}
