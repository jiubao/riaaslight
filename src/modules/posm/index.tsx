import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosmShots, selectPosmShotsGroup } from '../../store/posmSlice'
import { PosmFilters } from './filters'
import { PosmShotGroup } from './group'
import './index.scss'

interface IProps {
  id?: string
}

const PREFIX = 'Posm'

export const Posm: React.FC<IProps> = ({ id }) => {
  const dispatch = useDispatch()
  const shotGroups = useSelector(selectPosmShotsGroup)

  useEffect(() => {
    dispatch(fetchPosmShots() as any)
  }, [dispatch])

  return (
    <div className={PREFIX}>
      <PosmFilters />
      {shotGroups.map((group) => (
        <PosmShotGroup
          key={group.month}
          // onClick={handleOpenDetail}
          {...group}
        />
      ))}
    </div>
  )
}
