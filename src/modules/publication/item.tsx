import React from 'react'
import { useSelector } from 'react-redux'
import { IPublication } from '../../domain'
import { selectPublisherHash } from '../../store/publicationSlice'

interface IProps {
  data: IPublication
}

const PREFIX = 'PublicationItem'

export const PublicationItem: React.FC<IProps> = ({ data }) => {
  const publisherHash = useSelector(selectPublisherHash)

  const handleClick = () => {
    //
  }
  return (
    <div className={PREFIX} onClick={handleClick}>
      <img src={data.cover_url} alt="" />
      <div className={`${PREFIX}-info flexMiddle`}>
        &copy;&nbsp;
        {publisherHash[data.publisher_id]?.publisher_name}
      </div>
    </div>
  )
}
