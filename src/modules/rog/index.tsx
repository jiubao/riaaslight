import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MapWrapper, Map } from '../../components/googleMap'
import { LR } from '../../components/layout/lr'
import { fetchCategories, fetchRetailers } from '../../store/commonSlice'
import './index.scss'
import { RogList } from './list'

interface IProps {
  id?: string
}

const PREFIX = 'Rog'

export const Rog: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchRetailers() as any)
    dispatch(fetchCategories() as any)
  }, [dispatch])
  return (
    <LR className={PREFIX} left={<RogList />} percent={60}>
      <MapWrapper>
        <Map className={`${PREFIX}-map`} />
      </MapWrapper>
    </LR>
  )
}
