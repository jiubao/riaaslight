import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { selectAllBrands } from '../../../store/commonSlice'
import {
  fetchStores,
  selectSelectedBrandIds,
  selectSelectedCategoryIds,
  updateRog,
} from '../../../store/rogSlice'

const PREFIX = 'BrandList'

const TOP_COUNT = 20

const params = {
  brand: 111,
  category: 1,
  location_range:
    '50.97380320853852,-65.24909547188548,22.737910001296626,-128.53034547188548',
  field_set: 'location',
  start: 0,
  limit: 500,
}

export const BrandList: React.FC = () => {
  const [showMore, setShowMore] = useState(false)
  const dispatch = useDispatch()
  const brands = useSelector(selectAllBrands)
  const categoryIds = useSelector(selectSelectedCategoryIds)
  const brandIds = useSelector(selectSelectedBrandIds)
  const handleChange = (value: number[]) => {
    dispatch(updateRog({ selectedBrandIds: value }))
    if (value.length && categoryIds.length) {
      dispatch(
        fetchStores({
          ...params,
          brand: value[0],
          category: categoryIds[0],
        }) as any
      )
    } else {
      dispatch(updateRog({ stores: [] }))
    }
  }

  return (
    <>
      <div className={`${PREFIX} BizUnit-list`}>
        <ToggleSelectorGroup value={brandIds} onChange={handleChange}>
          <>
            {brands.slice(0, TOP_COUNT).map((item) => (
              <ToggleSelectorItem value={item.id} key={item.id}>
                <BizUnit
                  id={String(item.id)}
                  text={item.brand_name}
                  base64={item.brand_icon}
                />
              </ToggleSelectorItem>
            ))}
            {showMore &&
              TOP_COUNT < brands.length &&
              brands.slice(TOP_COUNT).map((item) => (
                <ToggleSelectorItem value={item.id} key={item.id}>
                  <BizUnit
                    id={String(item.id)}
                    text={item.brand_name}
                    base64={item.brand_icon}
                  />
                </ToggleSelectorItem>
              ))}
          </>
        </ToggleSelectorGroup>
      </div>
      {TOP_COUNT < brands.length && (
        <div
          className={`${PREFIX}-more`}
          onClick={() => setShowMore(!showMore)}
        >
          {`${showMore ? 'less' : 'more'}`} brands...
        </div>
      )}
    </>
  )
}
