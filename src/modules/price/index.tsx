import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WaterFall from '../../components/WaterFall'
import { WaterFallDataItem } from '../../components/WaterFall/interface'
import { ISku } from '../../domain'
import { fetchCategories, fetchRetailers } from '../../store/commonSlice'
import {
  fetchSkuList,
  noMoreSkuSelector,
  skuList,
  skuListLoadingSelector,
} from '../../store/priceSlice'
import Card from './card'
import './index.scss'
import PricePanel from './pricePanel'
import Search from './search'
interface IProps {
  id?: string
}

const PREFIX = 'Price'

export const Price: React.FC<IProps> = ({ id }) => {
  const list = useSelector(skuList)
  const dispatch = useDispatch()
  const skuListLoading = useSelector(skuListLoadingSelector)
  const noMoreSku = useSelector(noMoreSkuSelector)
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

  useEffect(() => {
    dispatch(fetchRetailers() as any)
    dispatch(fetchCategories() as any)
  }, [])

  const onDynamicLoad = () => {
    console.log('loadingnext')
    dispatch(fetchSkuList(false) as any)
  }
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
        loading={skuListLoading}
        className="Price-list"
        gutter={8}
        noMoreData={noMoreSku}
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
