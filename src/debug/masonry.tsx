import { isArray } from 'lodash'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShelfShotGroup } from '../components/ShelfShot'
import {
  fetchShelfShots,
  selectHasNextShots,
  selectShelfShotsGroup,
} from '../store/storeSlice'
// import { VariableSizeList as List } from 'react-window'
// import { Virtuoso } from 'react-virtuoso'

const PREFIX = 'DemoMasonry'

export const DemoMasonry: React.FC = React.memo(() => {
  const loadingRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const shotGroup = useSelector(selectShelfShotsGroup)
  const hasNext = useSelector(selectHasNextShots)

//   useEffect(() => {
//     dispatch(fetchShelfShots(713295) as any)
//   }, [dispatch])

  useEffect(() => {
    if (!loadingRef.current) return
    // console.log(1)
    const dom = loadingRef.current

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (isArray(entries) && entries.length && entries[0].isIntersecting) {
            dispatch(fetchShelfShots(713295) as any)
        }
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
  }, [dispatch])

  //   const getItemSize = (index: number) => {}
  //   const row = (index: number) => {
  //     const group = shotGroup[index]
  //     return <ShelfShotGroup key={group.month} {...group} />
  //   }

  return (
    <div className={PREFIX}>
      {/* <List
        height={900}
        itemCount={shotGroup.length}
        width={1440}
        itemSize={getItemSize}
      ></List> */}
      {/* {shotGroup} */}
      {/* <Virtuoso
        style={{ height: '900px' }}
        totalCount={shotGroup.length}
        itemContent={row}
      /> */}
      {shotGroup.map((group) => (
        <ShelfShotGroup key={group.month} {...group} />
      ))}
      {hasNext && <div ref={loadingRef}>loading...</div>}
    </div>
  )
})
