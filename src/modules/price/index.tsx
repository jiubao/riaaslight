import React, { useMemo, useState } from 'react'
import Search from './search'
import WaterFall from '../../components/WaterFall'
import { WaterFallDataItem } from '../../components/WaterFall/interface'
import { useSelector } from 'react-redux'
import { skuList } from '../../store/priceSlice'
import Card from './card'
import PricePanel from './pricePanel'
import './index.scss'
import { ISku } from '../../domain'
interface IProps {
  id?: string
}

const PREFIX = 'Price'

export const Price: React.FC<IProps> = ({ id }) => {
  const list = useSelector(skuList)
  const [visible, setVisible] = useState<boolean>(false)
  const [currentItem, setCurrentItem] = useState<WaterFallDataItem & ISku>()
  const photos: Array<WaterFallDataItem & ISku> = useMemo(() => {
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
  const showDetail = (data: WaterFallDataItem & ISku) => {
    setVisible(true)
    setCurrentItem(data)
  }

  const hideDetail = () => {
    setVisible(false)
  }

  return (
    <div className={PREFIX}>
      <Search></Search>
      <WaterFall
        className="Price-list"
        gutter={8}
        noMoreData={false}
        columnCount={10}
        waterFallDataList={photos}
        scrollToBottomCallback={onDynamicLoad}
        render={(item, onClick) => {
          return (
            <Card
              onClick={onClick}
              showDetail={showDetail}
              data={item as any}
              url={item.url}
            />
          )
        }}
      />
      <PricePanel
        visible={visible}
        data={currentItem}
        onClose={hideDetail}
      ></PricePanel>
    </div>
  )
}
