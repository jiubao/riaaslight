import { reduce } from 'lodash'
import { WaterFallDataItem } from './interface'

export const getRowWidth = (data: WaterFallDataItem[]) => {
  return reduce(data, (ac: number, cur: WaterFallDataItem) => ac + cur.width, 0)
}

export const zoomRowItems = (data: WaterFallDataItem[], ratio: number) => {
  let offsetLeft = 0
  data.forEach((value) => {
    value.width *= ratio
    value.height *= ratio
    value.offsetLeft = offsetLeft
    offsetLeft += value.width
  })
}

export const addItemToRow = (
  rowData: WaterFallDataItem[],
  item: WaterFallDataItem
) => {
  rowData.push(item)
}
