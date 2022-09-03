import React from 'react'
import { LR } from '../../components/layout/lr'
import { StoreImages } from './images'
import { StoreInfo } from './info'
import './index.scss'
// import { useParams } from 'react-router'
// import { useDispatch } from 'react-redux'
// import { fetchShelfShots, fetchStoreDetail } from '../../store/storeSlice'
// import { fetchCategories } from '../../store/commonSlice'
// import { ICategory } from '../../domain'

const PREFIX = 'Store'

export const Store: React.FC = React.memo(() => {
  // const dispatch = useDispatch()
  // const { id } = useParams()

  // useEffect(() => {
  //   dispatch(fetchCategories() as any).then((res: any) => {
  //     const categories = res.payload as ICategory[]
  //   })
  // }, [dispatch])

  // useEffect(() => {
  //   id && dispatch(fetchStoreDetail(Number(id)) as any)
  //   id && dispatch(fetchShelfShots({ storeId: Number(id) }) as any)
  // }, [dispatch, id])

  return (
    <LR percent={26} className={PREFIX} left={<StoreInfo />}>
      <StoreImages />
    </LR>
  )
})
