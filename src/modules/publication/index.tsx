import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPublications,
  fetchPublishers,
  resetPublication,
  selectPublicationHasNext,
  selectPublications,
} from '../../store/publicationSlice'
import './index.scss'
import { PublicationFilter } from './filter'
import { PublicationItem } from './item'
import { Masonry } from '../../components/masonry'
import classNames from 'classnames'
import { CircularProgress } from '@mui/material'
import { useIntersection } from '../../hooks/useIntersection'
import { isArray } from 'lodash'

const PREFIX = 'Publication'

export const Publication: React.FC = () => {
  const dispatch = useDispatch()
  const publications = useSelector(selectPublications)
  const hasNext = useSelector(selectPublicationHasNext)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(fetchPublishers() as any)

    return () => {
      dispatch(resetPublication())
    }
  }, [dispatch])

  useIntersection(
    loadingRef,
    (entries) => {
      if (isArray(entries) && entries.length && entries[0].isIntersecting) {
        dispatch(fetchPublications() as any)
      }
    },
    [dispatch]
  )

  return (
    <div className={PREFIX}>
      <PublicationFilter />
      <Masonry columnCount={5} total={publications.length} gutter={15}>
        {({ index }: { index: number }) => {
          const item = publications[index]
          return <PublicationItem data={item} />
        }}
      </Masonry>
      {hasNext && (
        <div
          className={classNames('flexCenter', { hide: !hasNext })}
          ref={loadingRef}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  )
}
