import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MOCK_RETAILERS } from '../mock/retailer'
import { selectAllRetailers, updateCommon } from '../store/commonSlice'
import { RetailerList } from '../modules/rog/list/retailer'

const PREFIX = 'demo'

export const DemoToggleBox: React.FC = () => {
    const dispatch = useDispatch()
    // const retailers = useSelector(selectAllRetailers)

    useEffect(() => {
        dispatch(updateCommon({
            retailers: MOCK_RETAILERS as any
        }))
    }, [dispatch])

    return (
        <div className={PREFIX}>
            <RetailerList />
        </div>
    )
}
