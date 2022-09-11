import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPublishers, resetPublication } from '../../store/publicationSlice'
import './index.scss'

const PREFIX = 'Publication'

export const Publication: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPublishers() as any)

    return () => {
      dispatch(resetPublication())
    }
  }, [dispatch])

  return (
    <div className={PREFIX}>
      <div>p</div>
    </div>
  )
}
