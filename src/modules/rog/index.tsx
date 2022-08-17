import React from 'react'
import { MapWrapper, Map } from '../../components/googleMap'
import './index.scss'
import { RogList } from './list'

interface IProps {
  id?: string
}

const PREFIX = 'Rog'

export const Rog: React.FC<IProps> = ({ id }) => {
  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-left`}>
        <RogList />
      </div>
      {/* <div className={`${PREFIX}-right`}></div> */}
      <MapWrapper>
        <Map className={`${PREFIX}-right`} />
      </MapWrapper>
    </div>
  )
}
