export interface IMapPoint {
  lat: number
  lng: number
}

export interface IMapBounds {
  ne: IMapPoint
  sw: IMapPoint
}

export type GoogleMapEvents =
  | 'click'
  | 'idle'
  | 'zoom_changed'
  | 'bounds_changed'
  | 'dragend'
