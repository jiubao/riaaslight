import React, { useEffect } from 'react'
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  OutlinedInput,
  InputAdornment,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSearchParams,
  updateParams,
  fetchSkuList,
} from '../../../store/priceSlice'
import cls from 'classnames'
import './index.scss'
import { selectAllCategories } from '../../../store/commonSlice'
import SearchIcon from '@mui/icons-material/Search'
const PREFIX = 'PriceSearch'

interface IProps {
  className?: string
}

const PriceSearch: React.FC<IProps> = function PriceSearch(props) {
  const { className } = props
  const dispatch = useDispatch()
  const categories = useSelector(selectAllCategories)
  const countries: any[] = []
  const params = useSelector(selectSearchParams)
  useEffect(() => {
    dispatch(fetchSkuList() as any)
  }, [])
  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      updateParams({
        category: e.target.value,
      })
    )
    console.log(e.target.value)
  }

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      updateParams({
        country: e.target.value,
      })
    )
    console.log(e.target.value)
  }

  // const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
  //   e
  // ) => {
  //   dispatch(
  //     updateParams({
  //       search: e.target.value,
  //     })
  //   )
  //   console.log(e.target.value)
  // }
  return (
    <div className={cls(`${PREFIX}`, className)}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          id="demo-select-small"
          value={params.country}
          onChange={handleCountryChange}
        >
          {countries.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          id="demo-select-small"
          value={params.category}
          onChange={handleCategoryChange}
        >
          {categories.map((item) => (
            <MenuItem key={item.category_name} value={item.category_name}>
              {item.category_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <FormControl sx={{ m: 1, width: 200 }} variant="filled">
        <OutlinedInput
          id="outlined-adornment-amount"
          value={params.search}
          size="small"
          placeholder="search"
          onChange={handleSearchChange}
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          }
        />
      </FormControl> */}
    </div>
  )
}

export default PriceSearch
