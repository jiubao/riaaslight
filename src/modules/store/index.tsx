import React, { useEffect } from 'react'
import { LR } from '../../components/layout/lr'
import { StoreImages } from './images'
import { StoreInfo } from './info'
import './index.scss'
// import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { resetStore } from '../../store/storeSlice'
import { fetchAllBrands, fetchCategories } from '../../store/commonSlice'

const PREFIX = 'Store'

export const Store: React.FC = React.memo(() => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories() as any)
    dispatch(fetchAllBrands() as any)
    return () => {
      dispatch(resetStore() as any)
    }
  }, [dispatch])

  return (
    <LR percent={26} className={PREFIX} left={<StoreInfo />}>
      <StoreImages />
    </LR>
  )
})
