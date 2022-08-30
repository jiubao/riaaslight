import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShelfShotGroup } from '../components/ShelfShot'
import { fetchShelfShots, selectShelfShotsGroup } from '../store/storeSlice'

const PREFIX = 'DemoMasonry'

export const DemoMasonry: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchShelfShots(713295) as any)
    }, [dispatch])

    const shotGroup = useSelector(selectShelfShotsGroup)

    return (
        <div className={PREFIX}>
            {
                shotGroup.map(group => (<ShelfShotGroup {...group} />))
            }
        </div>
    )
}
