import React from 'react'
import { MapWrapper, Map } from '../../components/googleMap'
import { LR } from '../../components/layout/lr'
import './index.scss'
import { RogList } from './list'

interface IProps {
  id?: string
}

const PREFIX = 'Rog'

export const Rog: React.FC<IProps> = ({ id }) => {
  return (
    <LR className={PREFIX} left={<RogList />} percent={60}>
      <MapWrapper>
        <Map className={`${PREFIX}-map`} />
      </MapWrapper>
    </LR>
  )
}
