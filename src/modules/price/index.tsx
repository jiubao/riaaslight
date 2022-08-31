import React, { useMemo } from 'react'
import Search from './search'
import WaterFall from '../../components/WaterFall'
import { WaterFallDataItem } from '../../components/WaterFall/interface'
import { useSelector } from 'react-redux'
import { priceList } from '../../store/priceSlice'
import Card from './card'
import './index.scss'
interface IProps {
  id?: string
}

const PREFIX = 'Price'

export const Price: React.FC<IProps> = ({ id }) => {
  const list = useSelector(priceList)

  const photos: WaterFallDataItem[] = useMemo(() => {
    return list.map((item) => {
      return {
        ...item,
        width: 120,
        height: 160,
        url: item.sku_cover_pic_url,
      }
    })
  }, [list])

  const onDynamicLoad = () => {}
  return (
    <div className={PREFIX}>
      <Search></Search>
      <WaterFall
        className="Price-list"
        gutter={8}
        noMoreData={false}
        columnCount={4}
        waterFallDataList={photos}
        scrollToBottomCallback={onDynamicLoad}
        render={(item, onClick) => {
          return <Card onClick={onClick} data={item} url={item.url} />
        }}
      />
    </div>
  )
}
