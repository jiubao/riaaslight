import React, { PropsWithChildren, useEffect } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { PropsWithClassName } from '../../domain/common'
import classNames from 'classnames'
import { GoogleMapApiKey } from '../../constants/map'
import { useDeepCompareEffectForMaps } from '../../hooks/map'

const PREFIX = 'GoogleMap'

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

interface IMapProps extends google.maps.MapOptions {
  style?: { [key: string]: string }
  onClick?: (e: google.maps.MapMouseEvent) => void
  onIdle?: (map: google.maps.Map) => void
  onZoom?: (map: google.maps.Map) => void
  onDragEnd?: (map: google.maps.Map) => void
  onBoundsChanged?: (map: google.maps.Map) => void
}

// export const Map: React.FC<
//   PropsWithClassName<PropsWithChildren<IMapProps>>
// > = ({ className, onClick, onIdle, children, ...options }) => {
//   const ref = useRef<HTMLDivElement>(null)
//   const [map, setMap] = React.useState<google.maps.Map>()

//   useEffect(() => {
//     if (ref.current && !map) {
//       const instance = new window.google.maps.Map(ref.current, {})
//       instance.setOptions(options)
//       setMap(instance)
//       ;(window as unknown as any).mapIns = instance
//     }
//   }, [ref, map])

//   return <div className={classNames(PREFIX, className)} ref={ref} />
// }

export const Map: React.FC<
  PropsWithClassName<PropsWithChildren<IMapProps>>
> = ({
  className,
  onClick,
  onIdle,
  onZoom,
  onDragEnd,
  onBoundsChanged,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}))
    }
  }, [ref, map])

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options)
    }
  }, [map, options])

  useEffect(() => {
    if (map) {
      ;['click', 'idle', 'zoom_changed', 'bounds_changed', 'dragend'].forEach(
        (eventName) => google.maps.event.clearListeners(map, eventName)
      )

      onDragEnd && map.addListener('dragend', () => onDragEnd(map))

      onBoundsChanged &&
        map.addListener('zoom_changed', () => onBoundsChanged(map))

      onZoom && map.addListener('zoom_changed', () => onZoom(map))

      if (onClick) {
        map.addListener('click', onClick)
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map))
      }
    }
  }, [map, onBoundsChanged, onClick, onDragEnd, onIdle, onZoom])

  return (
    <>
      <div ref={ref} style={style} className={classNames(PREFIX, className)} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map })
        }
      })}
    </>
  )
}
