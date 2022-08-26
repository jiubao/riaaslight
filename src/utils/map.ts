import { IMapBounds } from '../domain/map'

export const getPointsFromBounds = (
  bounds: google.maps.LatLngBounds
): IMapBounds => {
  const ne = bounds.getNorthEast()
  const sw = bounds.getSouthWest()

  return {
    ne: {
      lat: ne.lat(),
      lng: ne.lng(),
    },
    sw: {
      lat: sw.lat(),
      lng: sw.lng(),
    },
  }
}
