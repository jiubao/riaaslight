import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import cls from 'classnames'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAllCategories,
  selectAllCountries,
} from '../../../store/commonSlice'
import {
  fetchSkuList,
  selectSearchParams,
  updateParams,
} from '../../../store/priceSlice'
import './index.scss'
const PREFIX = 'PriceSearch'

interface IProps {
  className?: string
}

const PriceSearch: React.FC<IProps> = function PriceSearch(props) {
  const { className } = props
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)
  const countries = useSelector(selectAllCountries)
  const params = useSelector(selectSearchParams)

  const categoryOptions = useMemo(() => {
    return categories.reduce(
      (out, item) => {
        out.push({
          label: item.category_name,
          value: item.id,
        })
        return out
      },
      [] as Array<{
        label: string
        value: number | string
      }>
    )
  }, [categories])

  const countryOptions = useMemo(() => {
    return countries.reduce(
      (out, item) => {
        out.push({
          label: item.country_name,
          value: item.country_name,
        })
        return out
      },
      [] as Array<{
        label: string
        value: string
      }>
    )
  }, [countries])

  useEffect(() => {
    dispatch(fetchSkuList(true) as any)
  }, [dispatch])

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      updateParams({
        category: e.target.value,
      })
    )
    dispatch(fetchSkuList(true) as any)
  }

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      updateParams({
        country: e.target.value,
      })
    )
    dispatch(fetchSkuList(true) as any)
  }

  return (
    <div className={cls(`${PREFIX}`, className)}>
      <FormControl
        size="small"
        sx={{
          width: '140px',
          backgroundColor: 'white',
        }}
      >
        <InputLabel id="region-label">Region</InputLabel>
        <Select
          className={`${PREFIX}-country`}
          labelId="region-label"
          label="Region"
          value={params.country}
          onChange={handleCountryChange}
        >
          {countryOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size="small"
        sx={{
          marginLeft: '16px',
          width: '220px',
          backgroundColor: 'white',
        }}
      >
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          label="Category"
          value={params.category}
          onChange={handleCategoryChange}
        >
          {categoryOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default PriceSearch
