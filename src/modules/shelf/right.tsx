import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSelectedBrandIds,
  selectShelfBrands,
  selectShelfCategories,
  updateShelf,
} from '../../store/shelfSlice'
import { BrandList } from '../common/brand'
import { CategoryList } from '../common/category'
import CloseIcon from '@mui/icons-material/Close'

const PREFIX = 'ShelfDetailRight'
interface IProps {
  onClose?: () => void
}

export const ShelfDetailRight: React.FC<IProps> = ({ onClose }) => {
  const dispatch = useDispatch()
  const selectedBrandIds = useSelector(selectSelectedBrandIds)
  const brands = useSelector(selectShelfBrands)
  const categories = useSelector(selectShelfCategories)

  const handleBrandChange = (selectedBrandIds: number[]) => {
    dispatch(updateShelf({ selectedBrandIds }))
  }

  return (
    <div className={PREFIX}>
      <span className={`${PREFIX}-title`}>CATEGORY</span>
      <CategoryList categories={categories} />
      <span className={`${PREFIX}-title`}>BRAND</span>
      <BrandList
        selected={selectedBrandIds}
        brands={brands}
        onChange={handleBrandChange}
      />
      <CloseIcon className={`${PREFIX}-close`} onClick={onClose} />
    </div>
  )
}
