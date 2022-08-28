import React, { useEffect } from 'react'

interface IProps extends google.maps.MarkerOptions {
  onClick?: (marker: google.maps.Marker, id?: number) => void
  id?: number
}

export const Marker: React.FC<IProps> = ({ id, onClick, ...options }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>()

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  useEffect(() => {
    if (marker) {
      marker.setOptions(options)
    }
  }, [marker, options])

  useEffect(() => {
    if (marker) {
      let offClick: google.maps.MapsEventListener
      if (onClick) {
        offClick = marker.addListener('click', () => {
          onClick(marker, id)
        })
      }

      return () => {
        offClick?.remove()
      }
    }
  }, [id, marker, onClick])

  return null
}
