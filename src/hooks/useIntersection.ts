// import { isArray } from "lodash"
import { useEffect } from 'react'

export const useIntersection = (
  domRef: React.RefObject<HTMLDivElement>,
  callback: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void,
  deps: any[]
) => {
  useEffect(() => {
    const dom = domRef.current
    if (!dom) return

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      // if (isArray(entries) && entries.length && entries[0].isIntersecting) {
      //   dispatch(fetchShelfShots({}) as any)
      // }
      callback(entries, observer)
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    })
    observer.observe(dom)

    return () => {
      // console.log(2)
      observer.unobserve(dom)
      observer.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps])
}
