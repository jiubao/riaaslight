import { SvgIcon } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { BizUnit } from '../../components/BizUnit'
import { CategoryList } from '../common/category/category'
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import GitHubIcon from '@mui/icons-material/GitHub'
// import PlaceIcon from '@mui/icons-material/Place'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBrands,
  fetchShelfShots,
  fetchStoreDetail,
  resetStore,
  selectSelectedBrandIds,
  selectSelectedCategoryIds,
  selectStoreBrands,
  selectStoreCategories,
  selectStoreDetail,
  updateStore,
} from '../../store/storeSlice'
import { parseStoreAddress } from '../../utils'
import { BrandList } from '../common/brand'
import { fetchCategories } from '../../store/commonSlice'
import { ICategory } from '../../domain'

const PREFIX = 'StoreInfo'

export const StoreInfo: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const storeDetail = useSelector(selectStoreDetail)
  const selectedCategoryIds = useSelector(selectSelectedCategoryIds)
  const categories = useSelector(selectStoreCategories)
  const selectedBrandIds = useSelector(selectSelectedBrandIds)
  const brands = useSelector(selectStoreBrands)

  const handleCategoryChange = useCallback(
    (value: number[]) => {
      dispatch(updateStore({ selectedCategoryIds: value }))
      if (value.length) {
        dispatch(fetchBrands(value[0]) as any)
      } else {
        dispatch(updateStore({ brands: [] }))
      }
      dispatch(resetStore())
      dispatch(fetchShelfShots({}) as any)
    },
    [dispatch]
  )

  const handleBrandChange = useCallback(
    (value: number[]) => {
      dispatch(updateStore({ selectedBrandIds: value }))
      dispatch(resetStore())
      dispatch(fetchShelfShots({}) as any)
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(fetchCategories() as any).then((res: any) => {
      const categories = res.payload as ICategory[]
      if (categories.length) {
        handleCategoryChange([categories[0].id])
      } else if (id) {
        dispatch(fetchShelfShots({ storeId: Number(id) }) as any)
      }
    })
  }, [dispatch, handleCategoryChange, id])

  useEffect(() => {
    id && dispatch(fetchStoreDetail(Number(id)) as any)
    // id && dispatch(fetchShelfShots({ storeId: Number(id) }) as any)
  }, [dispatch, id])

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-header`}>
        <SvgIcon
          component={ArrowBackIosNewOutlinedIcon}
          className={`${PREFIX}-back`}
          fontSize="large"
          onClick={() => navigate('/rog')}
        />
        <div className={`${PREFIX}-brand flex middle`}>
          <SvgIcon component={GitHubIcon} fontSize="large" />
          <span>{storeDetail?.store_name}</span>
        </div>
        <div className={`${PREFIX}-location flex middle`}>
          <SvgIcon component={PlaceOutlinedIcon} />
          <span>{parseStoreAddress(storeDetail)}</span>
        </div>
      </div>

      <span className={`${PREFIX}-title`}>PHOTO TYPE</span>
      <div className="BizUnit-list">
        <BizUnit text={'Shelf/ Cooler Photos'} />
        <BizUnit text={'POSM'} />
      </div>
      <span className={`${PREFIX}-title`}>CATEGORY</span>
      <CategoryList
        categories={categories}
        selected={selectedCategoryIds}
        onChange={handleCategoryChange}
      />
      <span className={`${PREFIX}-title`}>BRAND</span>
      <BrandList
        selected={selectedBrandIds}
        brands={brands}
        onChange={handleBrandChange}
      />
    </div>
  )
}
