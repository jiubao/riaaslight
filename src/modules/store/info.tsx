import { SvgIcon } from '@mui/material'
import React from 'react'
import { BizUnit } from '../../components/BizUnit'
import { CategoryList } from '../common/category/category'
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import GitHubIcon from '@mui/icons-material/GitHub'
// import PlaceIcon from '@mui/icons-material/Place'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBrands,
  selectSelectedBrandIds,
  selectSelectedCategoryIds,
  selectStoreBrands,
  selectStoreCategories,
  selectStoreDetail,
  updateStore,
} from '../../store/storeSlice'
import { parseStoreAddress } from '../../utils'
import { BrandList } from '../common/brand'

const PREFIX = 'StoreInfo'

export const StoreInfo: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const storeDetail = useSelector(selectStoreDetail)
  const selectedCategoryIds = useSelector(selectSelectedCategoryIds)
  const categories = useSelector(selectStoreCategories)
  const selectedBrandIds = useSelector(selectSelectedBrandIds)
  const brands = useSelector(selectStoreBrands)

  const handleCategoryChange = (value: number[]) => {
    dispatch(updateStore({ selectedCategoryIds: value }))
    if (value.length) {
      dispatch(fetchBrands(value[0]) as any)
    } else {
      dispatch(updateStore({ brands: [] }))
    }
  }

  const handleBrandChange = (value: number[]) => {
    dispatch(updateStore({ selectedBrandIds: value }))
  }

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
        <BizUnit text={'Shelf/ Cooler Photos'} pure={true} />
        <BizUnit text={'POSM'} pure={true} />
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
