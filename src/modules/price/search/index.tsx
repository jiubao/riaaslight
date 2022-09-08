import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
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
      [{ label: 'All', value: 'All' }] as Array<{
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
      [{ label: 'All', value: 'All' }] as Array<{
        label: string
        value: string
      }>
    )
  }, [countries])

  useEffect(() => {
    dispatch(fetchSkuList(true) as any)
  }, [])
  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      updateParams({
        category: e.target.value,
      })
    )
    dispatch(fetchSkuList(true) as any)
    console.log(e.target.value)
  }

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      updateParams({
        country: e.target.value,
      })
    )
    dispatch(fetchSkuList(true) as any)
    console.log(e.target.value)
  }

  return (
    <div className={cls(`${PREFIX}`, className)}>
      <Select
        className={`${PREFIX}-country`}
        value={params.country}
        size="small"
        onChange={handleCountryChange}
      >
        {countryOptions.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <Select
        className={`${PREFIX}-category`}
        size="small"
        value={params.category}
        onChange={handleCategoryChange}
      >
        {categoryOptions.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default PriceSearch
