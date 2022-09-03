import { isArray } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShelfShotGroup } from '../../components/ShelfShot'
// import { mockImgSrcByCount } from '../../mock/img'
import {
  fetchShelfShots,
  selectHasNextShots,
  selectShelfShotsGroup,
} from '../../store/storeSlice'
import Measure, { ContentRect } from 'react-measure'
import { ITimelineItem, Timeline } from '../../components/timeline'
import { useTimelineScrollItems } from '../../components/timeline/hooks'
import CircularProgress from '@mui/material/CircularProgress'
import { fetchShelf } from '../../store/shelfSlice'
import { Drawer } from '@mui/material'
import { ShelfDetail } from '../shelf'

interface IProps {
  id?: string
}

const PREFIX = 'StoreImages'

// const TOTAL = 100
// const srcs = mockImgSrcByCount(TOTAL)

// const Row = ({ index }: { index: number }) => {
//   return <img src={`${srcs[index]}/?text=${index}`} alt="" />
// }

export const StoreImages: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const loadingRef = useRef<HTMLDivElement>(null)
  const shotGroups = useSelector(selectShelfShotsGroup)
  const hasNext = useSelector(selectHasNextShots)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [timelineItems, setTimelineItems] = useState<ITimelineItem[]>([])
  const scrollItems = useTimelineScrollItems(timelineItems, scrollRef)
  const [detailVisible, setDetailVisible] = useState(false)
  // const [selectedShelfId, setSelectedShelfId] = useState<number | null>(null)

  useEffect(() => {
    if (!loadingRef.current) return

    const dom = loadingRef.current

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (isArray(entries) && entries.length && entries[0].isIntersecting) {
        dispatch(fetchShelfShots({ storeId: 713295 }) as any)
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

  const handleResize = (contentRect: ContentRect) => {
    // this.setState({ dimensions: contentRect.bounds })
    // console.log(contentRect)
    const list = document
      .getElementsByClassName('StoreImages')?.[0]
      ?.querySelectorAll<HTMLElement>('[data-month]')
    if (list && list.length) {
      const items = Array.from(list).map((item) => {
        const content = item.dataset.month || null
        const offset = item.offsetTop
        return { offset, content }
      })
      // Array.from(list).reduce((result, item) => {}, [{ offset: 0, content: list[0].dataset.month}])
      // console.log(items)
      setTimelineItems(items)
    }
  }

  const handleOpenDetail = (shelfId: number) => {
    dispatch(fetchShelf(shelfId) as any).then((res: any) => {
      // console.log(res.payload)
      // setSelectedShelfId(shelfId)
      setDetailVisible(true)
    })
  }

  return (
    <div className={`${PREFIX}-scroller fulfilled`} ref={scrollRef}>
      <Measure bounds onResize={handleResize}>
        {({ measureRef }) => (
          <div className={PREFIX} ref={measureRef}>
            <Timeline items={scrollItems} />
            {shotGroups.map((group) => (
              <ShelfShotGroup
                key={group.month}
                onClick={handleOpenDetail}
                {...group}
              />
            ))}

            {hasNext && (
              <div className="flexCenter" ref={loadingRef}>
                <CircularProgress />
              </div>
            )}
          </div>
        )}
      </Measure>
      <Drawer
        anchor="bottom"
        open={detailVisible}
        onClose={() => setDetailVisible(false)}
        className={`${PREFIX}-drawer`}
      >
        <ShelfDetail />
      </Drawer>
    </div>
  )
}
