import { CircularProgress } from '@mui/material'
import classNames from 'classnames'
import { isArray } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Measure from 'react-measure'
import { useDispatch, useSelector } from 'react-redux'
import { ITimelineItem, Timeline } from '../../components/timeline'
import { useTimelineScrollItems } from '../../components/timeline/hooks'
import { useIntersection } from '../../hooks/useIntersection'
import { fetchRetailers } from '../../store/commonSlice'
import {
  fetchPosmShots,
  selectHasNextShots,
  selectPosmShotsGroup,
} from '../../store/posmSlice'
import { PosmFilters } from './filters'
import { PosmShotGroup } from './group'
import './index.scss'

interface IProps {
  id?: string
}

const PREFIX = 'Posm'

export const Posm: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const shotGroups = useSelector(selectPosmShotsGroup)
  const hasNext = useSelector(selectHasNextShots)
  const loadingRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [timelineItems, setTimelineItems] = useState<ITimelineItem[]>([])
  const scrollItems = useTimelineScrollItems(timelineItems, scrollRef)

  useEffect(() => {
    dispatch(fetchRetailers() as any)
    dispatch(fetchPosmShots(true) as any)
  }, [dispatch])

  useIntersection(
    loadingRef,
    (entries) => {
      if (isArray(entries) && entries.length && entries[0].isIntersecting) {
        dispatch(fetchPosmShots(false) as any)
      }
    },
    [dispatch]
  )

  const handleResize = useCallback(() => {
    const list = document
      .getElementsByClassName(PREFIX)?.[0]
      ?.querySelectorAll<HTMLElement>('[data-month]')
    if (list && list.length) {
      const items = Array.from(list).map((item) => {
        const content = item.dataset.month || null
        const offset = item.offsetTop
        return { offset, content }
      })
      setTimelineItems(items)
    }
  }, [])

  useEffect(() => {
    handleResize()
  }, [handleResize])

  const handleFilterChange = useCallback(() => {
    setTimelineItems([])
  }, [])

  return (
    <div className={`${PREFIX}-wrap fulfilled`} ref={scrollRef}>
      <PosmFilters onChange={handleFilterChange} />
      <Measure bounds onResize={handleResize}>
        {({ measureRef }) => (
          <div className={PREFIX} ref={measureRef}>
            <Timeline items={scrollItems} />
            {shotGroups.map((group) => (
              <PosmShotGroup
                key={group.month}
                // onClick={handleOpenDetail}
                {...group}
              />
            ))}
            {/* {hasNext && ()} */}
            <div
              className={classNames('flexCenter', { hide: !hasNext })}
              ref={loadingRef}
            >
              <CircularProgress />
            </div>
          </div>
        )}
      </Measure>
    </div>
  )
}
