import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MOCK_RETAILERS } from '../mock/retailer'
import { updateCommon } from '../store/commonSlice'
// import { RetailerList } from '../modules/rog/list/retailer'

const PREFIX = 'DemoToggle'

export const DemoToggleBox: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      updateCommon({
        retailers: MOCK_RETAILERS as any,
      })
    )
  }, [dispatch])

  return <div className={PREFIX}>{/* <RetailerList /> */}</div>
}
