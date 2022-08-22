import React, { useEffect } from 'react'
import { MapWrapper, Map } from '../../components/googleMap'
import { LR } from '../../components/layout/lr'
import { brandService } from '../../services/brand'
import './index.scss'
import { RogList } from './list'

interface IProps {
  id?: string
}

const PREFIX = 'Rog'

export const Rog: React.FC<IProps> = ({ id }) => {
  useEffect(() => {
    //
    brandService.get().then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <LR className={PREFIX} left={<RogList />} percent={60}>
      <MapWrapper>
        <Map className={`${PREFIX}-map`} />
      </MapWrapper>
    </LR>
  )
}
