import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPublications,
  fetchPublishers,
  resetPublication,
  selectPublications,
} from '../../store/publicationSlice'
import './index.scss'
import { PublicationFilter } from './filter'
import { PublicationItem } from './item'
import { Masonry } from '../../components/masonry'

const PREFIX = 'Publication'

export const Publication: React.FC = () => {
  const dispatch = useDispatch()
  const publications = useSelector(selectPublications)

  useEffect(() => {
    dispatch(fetchPublishers() as any)
    dispatch(fetchPublications() as any)

    return () => {
      dispatch(resetPublication())
    }
  }, [dispatch])

  return (
    <div className={PREFIX}>
      <PublicationFilter />
      <Masonry columnCount={5} total={publications.length} gutter={15}>
        {({ index }: { index: number }) => {
          const item = publications[index]
          return <PublicationItem data={item} />
        }}
      </Masonry>
    </div>
  )
}
