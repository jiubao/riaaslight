import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { IPublication } from '../../domain'
import { selectPublisherHash } from '../../store/publicationSlice'

interface IProps {
  data: IPublication
}

const PREFIX = 'PublicationItem'

export const PublicationItem: React.FC<IProps> = ({ data }) => {
  const publisherHash = useSelector(selectPublisherHash)

  const handleClick = useCallback(() => {
    var element = document.createElement('a')
    element.setAttribute('target', '_blank')
    element.setAttribute('href', data.url)
    element.setAttribute('download', 'xx.pdf')
    element.click()
  }, [data.url])

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
