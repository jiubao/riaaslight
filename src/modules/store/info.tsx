import { SvgIcon } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { CategoryList } from '../common/category'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchShelfShots,
  fetchStoreDetail,
  resetStoreBrand,
  resetStoreCategory,
  selectSelectedBrandIds,
  selectSelectedCategoryIds,
  selectStoreBrands,
  selectStoreCategories,
  selectStoreDetail,
  selectStoreRetailer,
} from '../../store/storeSlice'
import { parseStoreAddress } from '../../utils'
import { BrandList } from '../common/brand'
import { PNGIcon } from '../../components/icons/pngIcon'
import { PngIconType } from '../../domain/icon'

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
  const retailer = useSelector(selectStoreRetailer)

  const handleCategoryChange = useCallback(
    (value: number[]) => {
      dispatch(resetStoreCategory(value))
      dispatch(fetchShelfShots({}) as any)
    },
    [dispatch]
  )

  const handleBrandChange = useCallback(
    (value: number[]) => {
      dispatch(resetStoreBrand(value))
      dispatch(fetchShelfShots({}) as any)
    },
    [dispatch]
  )

  useEffect(() => {
    id && dispatch(fetchStoreDetail(Number(id)) as any)
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
          <PNGIcon
            type={PngIconType.Retailer}
            name={retailer?.retailer_icon}
            className={`${PREFIX}-retailer`}
          />
          <span>{storeDetail?.store_name}</span>
        </div>
        <div className={`${PREFIX}-location flex middle`}>
          <SvgIcon component={PlaceOutlinedIcon} />
          <span>{parseStoreAddress(storeDetail)}</span>
        </div>
      </div>

      {/* <span className={`${PREFIX}-title`}>PHOTO TYPE</span>
      <div className="BizUnit-list">
        <BizUnit text={'Shelf/ Cooler Photos'} />
        <BizUnit text={'POSM'} />
      </div> */}
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
