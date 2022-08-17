import React, { useEffect, useRef } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import './index.scss'

const PREFIX = 'MapDemo'

const render = (status: Status) => {
  return <h1>{status}</h1>
}

export const GoogleMapDemo: React.FC = () => {
  return (
    <div className={PREFIX}>
      <Wrapper
        apiKey={'AIzaSyBhUlTLE7gqk00FEdOKVFhCOd2j0uqVSxw'}
        render={render}
      >
        <Map></Map>
      </Wrapper>
    </div>
  )
}

export const Map: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      const instance = new window.google.maps.Map(ref.current, {})
      instance.setOptions({ center: { lat: -34.397, lng: 150.644 }, zoom: 8 })
      setMap(instance)
      ;(window as unknown as any).mapIns = instance
    }
  }, [ref, map])

  return <div className={`${PREFIX}-map`} ref={ref} />
}
