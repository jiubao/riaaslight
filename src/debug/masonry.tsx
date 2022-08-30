import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShelfShotGroup } from '../components/ShelfShot'
import {
  fetchShelfShots,
  selectHasNextShots,
  selectShelfShotsGroup,
} from '../store/storeSlice'
// import { VariableSizeList as List } from 'react-window'
// import { Virtuoso } from 'react-virtuoso'

const PREFIX = 'DemoMasonry'

export const DemoMasonry: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchShelfShots(713295) as any)
  }, [dispatch])

  const shotGroup = useSelector(selectShelfShotsGroup)
  const hasNext = useSelector(selectHasNextShots)

  //   const getItemSize = (index: number) => {}
  //   const row = (index: number) => {
  //     const group = shotGroup[index]
  //     return <ShelfShotGroup key={group.month} {...group} />
  //   }

  return (
    <div className={PREFIX}>
      {/* <List
        height={900}
        itemCount={shotGroup.length}
        width={1440}
        itemSize={getItemSize}
      ></List> */}
      {/* {shotGroup} */}
      {/* <Virtuoso
        style={{ height: '900px' }}
        totalCount={shotGroup.length}
        itemContent={row}
      /> */}
      {shotGroup.map((group) => (
        <ShelfShotGroup key={group.month} {...group} />
      ))}
      {hasNext && <div>loading...</div>}
    </div>
  )
}
