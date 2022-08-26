import { useEffect, useRef } from 'react'
import { isLatLngLiteral } from '@googlemaps/typescript-guards'
import { createCustomEqual } from 'fast-equals'

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) =>
    ((a: any, b: any) => {
      if (
        isLatLngLiteral(a) ||
        a instanceof google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof google.maps.LatLng
      ) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
      }

      // TODO extend to other types

      // use fast-equals for other objects
      return (deepEqual as any)(a, b)
    }) as any
)

function useDeepCompareMemoize(value: any) {
  const ref = useRef()

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

export function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize))
}
