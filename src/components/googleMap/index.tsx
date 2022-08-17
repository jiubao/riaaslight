import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { PropsWithClassName } from '../../domain/common'
import classNames from 'classnames'
import { Coordinates, GoogleMapApiKey } from '../../constants/map'

const PREFIX = 'GoogleMap'

const CENTER = { lat: Coordinates.newyork[0], lng: Coordinates.newyork[1] }

const options = { center: CENTER, zoom: 8, disableDefaultUI: true }

const render = (status: Status) => {
  return <h1>{status}</h1>
}

export const MapWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper apiKey={GoogleMapApiKey} render={render}>
      {children}
    </Wrapper>
  )
}

export const Map: React.FC<PropsWithClassName> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      const instance = new window.google.maps.Map(ref.current, {})
      instance.setOptions(options)
      setMap(instance)
      ;(window as unknown as any).mapIns = instance
    }
  }, [ref, map])

  return <div className={classNames(PREFIX, className)} ref={ref} />
}
