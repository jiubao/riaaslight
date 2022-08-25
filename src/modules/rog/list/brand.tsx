import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import {
  selectAllBrands,
  selectSelectedBrandIds,
  updateCommon,
} from '../../../store/commonSlice'

const PREFIX = 'BrandList'

const TOP_COUNT = 20

export const BrandList: React.FC = () => {
  const [showMore, setShowMore] = useState(false)
  const dispatch = useDispatch()
  const brands = useSelector(selectAllBrands)
  const brandIds = useSelector(selectSelectedBrandIds)
  const handleChange = (value: number[]) => {
    dispatch(updateCommon({ selectedBrandIds: value }))
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
