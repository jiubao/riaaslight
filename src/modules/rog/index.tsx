import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapWrapper, Map } from '../../components/googleMap'
import { Marker } from '../../components/googleMap/marker'
import { LR } from '../../components/layout/lr'
import { Coordinates } from '../../constants/map'
import {
  fetchAllBrands,
  fetchCategories,
  fetchRetailers,
} from '../../store/commonSlice'
import {
  fetchBrands,
  fetchStoreDetail,
  fetchStores,
  selectMapBounds,
  selectStoreDetail,
  selectStores,
  updateRog,
} from '../../store/rogSlice'
import { getPointsFromBounds } from '../../utils/map'
import './index.scss'
import { RogList } from './list'
import { StoreInfo } from './storeInfo'

interface IProps {
  id?: string
}

const PREFIX = 'Rog'
const CENTER = {
  lat: Coordinates.philippines[0],
  lng: Coordinates.philippines[1],
}
const DEFAULT_MAP_OPTIONS = { center: CENTER, zoom: 6 }

export const Rog: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const stores = useSelector(selectStores)
  const currentBounds = useSelector(selectMapBounds)
  const storeDetail = useSelector(selectStoreDetail)

  useEffect(() => {
    dispatch(fetchRetailers() as any)
    dispatch(fetchCategories() as any).then((res: any) => {
      const categories = res.payload
      // console.log(categories)
      if (categories?.length) {
        dispatch(updateRog({ selectedCategoryIds: [categories[0].id] }))
        dispatch(fetchBrands(categories[0].id) as any)
      }
    })
    dispatch(fetchAllBrands() as any)

    return () => {
      dispatch(updateRog({ selectedBrandIds: [], storeDetail: undefined }))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchStores() as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBounds])

  // const handleLoad = useCallback((map: google.maps.Map) => {
  //   console.log('map init...')
  // }, [])

  const handleMapChange = useCallback(
    (map: google.maps.Map) => {
      const mapBounds = map.getBounds()
      if (mapBounds) {
        const bounds = getPointsFromBounds(mapBounds)
        dispatch(updateRog({ bounds }))
      }
    },
    [dispatch]
  )

  const handleClickMarker = useCallback(
    (marker: google.maps.Marker, id?: number) => {
      // const latLng = marker.getPosition()
      // console.log(latLng?.lat(), latLng?.lng())
      // console.log(id)
      id && dispatch(fetchStoreDetail(id) as any)
    },
    [dispatch]
  )

  return (
    <LR className={PREFIX} left={<RogList />} percent={60}>
      <>
        <MapWrapper>
          <Map
            className={`${PREFIX}-map`}
            {...DEFAULT_MAP_OPTIONS}
            // disableDefaultUI={true}
            onLoad={handleMapChange}
            onZoom={handleMapChange}
            onDragEnd={handleMapChange}
          >
            {stores.map((store) => (
              <Marker
                id={store.store_id}
                key={store.store_id}
                position={{
                  lat: store.store_latitude,
                  lng: store.store_longitude,
                }}
                onClick={handleClickMarker}
              />
            ))}
          </Map>
        </MapWrapper>
        {storeDetail && (
          <div className={`${PREFIX}-storeOnMap`}>
            <StoreInfo store={storeDetail} />
          </div>
        )}
      </>
    </LR>
  )
}
