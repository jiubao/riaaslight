import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BizUnit } from '../../../components/BizUnit'
import {
  ToggleSelectorGroup,
  ToggleSelectorItem,
} from '../../../components/toggleSelector'
import { selectAllRetailers } from '../../../store/commonSlice'

const PREFIX = 'RetailerList'

export const RetailerList: React.FC = () => {
  // const navigate = useNavigate()
  const retailers = useSelector(selectAllRetailers)
  const [keys, setKeys] = useState<number[]>([])

  // const gotoDetail = (id?: string) => {
  //   id !== undefined && navigate(`/store/${id}`)
  // }

  const handleChange = (value: number[]) => {
    console.log(value)
    setKeys(value)
  }

  return (
    <div className={`${PREFIX} BizUnit-list`}>
      <ToggleSelectorGroup value={keys} onChange={handleChange}>
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
