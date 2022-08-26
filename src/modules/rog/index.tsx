import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapWrapper, Map } from '../../components/googleMap'
import { Marker } from '../../components/googleMap/marker'
import { LR } from '../../components/layout/lr'
import { Coordinates } from '../../constants/map'
import { fetchCategories, fetchRetailers } from '../../store/commonSlice'
import { selectStores } from '../../store/rogSlice'
import './index.scss'
import { RogList } from './list'

interface IProps {
  id?: string
}

const PREFIX = 'Rog'
const CENTER = { lat: Coordinates.newyork[0], lng: Coordinates.newyork[1] }
const DEFAULT_MAP_OPTIONS = { center: CENTER, zoom: 8, disableDefaultUI: true }

export const Rog: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const stores = useSelector(selectStores)
  useEffect(() => {
    dispatch(fetchRetailers() as any)
    dispatch(fetchCategories() as any)
  }, [dispatch])
  return (
    <LR className={PREFIX} left={<RogList />} percent={60}>
      <MapWrapper>
        <Map
          className={`${PREFIX}-map`}
          {...DEFAULT_MAP_OPTIONS}
          // disableDefaultUI={true}
        >
          {stores.map((store) => (
            <Marker
              key={store.store_id}
              position={{
                lat: store.store_latitude,
                lng: store.store_longitude,
              }}
            />
          ))}
        </Map>
      </MapWrapper>
    </LR>
  )
}
