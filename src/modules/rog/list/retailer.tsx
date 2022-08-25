import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import {
  selectAllRetailers,
  selectSelectedRetailerIds,
  updateCommon,
} from '../../../store/commonSlice'

const PREFIX = 'RetailerList'

export const RetailerList: React.FC = () => {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const retailers = useSelector(selectAllRetailers)
  const retailerIds = useSelector(selectSelectedRetailerIds)

  // const gotoDetail = (id?: string) => {
  //   id !== undefined && navigate(`/store/${id}`)
  // }

  const handleChange = (value: number[]) => {
    dispatch(updateCommon({ selectedRetailerIds: value }))
  }

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      <ToggleSelectorGroup
        value={retailerIds}
        onChange={handleChange}
        mode="SINGLE"
      >
        {retailers.map((item) => (
          <ToggleSelectorItem value={item.id} key={item.id}>
            <BizUnit
              id={String(item.id)}
              text={item.retailer_name}
              base64={item.retailer_icon}
            />
          </ToggleSelectorItem>
        ))}
      </ToggleSelectorGroup>
    </div>
  )
}
