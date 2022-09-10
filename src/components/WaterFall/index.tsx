import cls from 'classnames'
import memoize from 'memoize-one'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'
import { areEqual } from '../../utils/areEqual'
import Resize from '../Resize'
import WaterFallDataRow from './DataRow'
import './index.scss'
import { IDataItem, RowItem, WaterFallDataItem } from './interface'
import WaterFallLoadingRow from './LoadingRow'
import WaterFallNoMoreDataRow from './NoMoreDataRow'
import { addItemToRow, zoomRowItems } from './util'

const createStepData = memoize(
  (
    list: RowItem[],
    gutter: number,
    selectedItem: React.MutableRefObject<WaterFallDataItem | undefined>,
    onClickItem: (item: WaterFallDataItem) => void,
    render: Parameters<typeof WaterFall>[0]['render']
  ) => ({
    list,
    gutter,
    selectedItem,
    onClickItem,
    render,
  })
)

const Row = React.memo(
  ({
    data: rowData,
    index,
    style,
  }: {
    data: ReturnType<typeof createStepData>
    index: number
    style: any
  }) => {
    const { list, gutter, selectedItem, onClickItem, render } = rowData
    const data = list[index]

    if (data.type === 'data') {
      // const dataItemRender = isFastScroll ? () => <DefaultSkeleton /> : render;
      const dataItemRender = render
      return (
        <WaterFallDataRow
          index={index}
          key={index}
          //@ts-ignore
          height={list[index][0].height}
          data={data}
          gutter={gutter}
          onClickItem={onClickItem}
          selectedItem={selectedItem.current}
          render={dataItemRender}
          style={style}
        />
      )
    } else if (data.type === 'loading') {
      return <WaterFallLoadingRow style={style} key={index} />
    } else if (data.type === 'noMoreData') {
      return <WaterFallNoMoreDataRow style={style} key={index} />
    }
    return <div style={style} key={index}></div>
  },
  areEqual
)

export interface IWaterfallInstance {
  focusFirst: () => void
  closeDetail: () => void
}

interface IProps<T> {
  className?: string
  columnCount?: number
  baseHeight?: number
  gutter?: number
  noMoreData?: boolean
  waterFallDataList: T[]
  scrollToBottomCallback: () => void
  forwardRef?: (instance: IWaterfallInstance) => void
  loading?: boolean
  render: (
    item: T,
    onClick?: (item: T) => void
  ) => React.ReactElement<HTMLDivElement>
  forceBreak?: (currentRow: IDataItem, currentItem: T) => boolean
}
const PREFIX = 'WaterFall'
const SCROLL_BAR_WIDTH = 8
const LOADING_HEIGHT = 104
const NO_MORE_DATA_HEIGHT = 104

const WaterFall = function WaterFall({
  className,
  columnCount,
  baseHeight = 185,
  gutter = 6,
  waterFallDataList,
  forwardRef,
  scrollToBottomCallback,
  loading,
  noMoreData,
  forceBreak,
  render,
}: IProps<WaterFallDataItem>) {
  const wrapper = useRef<HTMLDivElement>(null)
  const listRef = useRef<List>(null)
  const [dataList, setDataList] = useState<RowItem[]>([])
  const selectedItem = useRef<WaterFallDataItem>()

  useEffect(() => {
    listRef.current?.resetAfterIndex(0)
  }, [dataList])

  const handleResize = () => {
    updateDataList()
  }

  const updateSelectedItem = useCallback(
    (imgGrid: RowItem[]) => {
      const selectedIndex = selectedItem.current?.index
      if (selectedIndex === undefined) {
        return
      }
      for (const row of imgGrid) {
        if (row.type === 'data') {
          const rowStartIndex = row[0].index as number
          const rowEndIndex = row[row.length - 1].index as number
          const isInRow =
            rowStartIndex <= selectedIndex && rowEndIndex >= selectedIndex
          if (isInRow) {
            selectedItem.current = row[selectedIndex - rowStartIndex]
          }
        }
      }
    },
    [selectedItem]
  )

  const initDataByColumnCount = useCallback(
    (list: WaterFallDataItem[]) => {
      const column = columnCount as number
      const containerEl = wrapper.current
      if (!containerEl) return
      const { offsetWidth } = containerEl
      let imgGrid = [] as RowItem[]
      let nextRow: IDataItem = []
      nextRow.type = 'data'
      let nextRowIndex = 0
      let stretchRatio = 0
      //@ts-ignore
      for (const [index, item] of list.entries()) {
        const itemWidth = baseHeight * (item.width / item.height)
        const itemWidthWithGutter = itemWidth + gutter * 2
        const rowWidth = itemWidthWithGutter * column
        stretchRatio = (offsetWidth - SCROLL_BAR_WIDTH) / rowWidth
        const itemHeightWithGutter = baseHeight + gutter * 2
        if (nextRow.length < column) {
          if (forceBreak?.(nextRow, item)) {
            imgGrid.push(nextRow)
            nextRow = []
            nextRow.type = 'data'
            nextRowIndex++
            addItemToRow(nextRow, {
              ...item,
              index,
              row: nextRowIndex,
              column: nextRow.length,
              width: itemWidthWithGutter,
              height: itemHeightWithGutter,
            })
            continue
          }
          addItemToRow(nextRow, {
            ...item,
            index,
            row: nextRowIndex,
            column: nextRow.length,
            width: itemWidthWithGutter,
            height: itemHeightWithGutter,
          })
          continue
        }

        zoomRowItems(nextRow, stretchRatio)
        imgGrid.push(nextRow)
        nextRow = []
        nextRow.type = 'data'
        nextRowIndex++
        addItemToRow(nextRow, {
          ...item,
          index,
          row: nextRowIndex,
          column: nextRow.length,
          width: itemWidthWithGutter,
          height: itemHeightWithGutter,
        })
      }
      if (nextRow?.length) {
        zoomRowItems(nextRow, stretchRatio)
        imgGrid.push(nextRow)
      }
      return imgGrid
    },
    [baseHeight, columnCount, gutter, forceBreak]
  )

  const updateDataList = useCallback(() => {
    let imgGrid: RowItem[] | undefined
    imgGrid = initDataByColumnCount(waterFallDataList)

    if (loading) {
      imgGrid?.push({ type: 'loading' })
    }
    if (noMoreData) {
      imgGrid?.push({ type: 'noMoreData' })
    }
    if (imgGrid) {
      setDataList(imgGrid)
      updateSelectedItem(imgGrid)
    }
  }, [
    initDataByColumnCount,
    loading,
    noMoreData,
    updateSelectedItem,
    waterFallDataList,
  ])

  useEffect(() => {
    updateDataList()
  }, [updateDataList])

  const onScroll = ({ scrollOffset }: any) => {
    const listDom = wrapper.current?.querySelector('.List')
    if (listDom) {
      const bottom =
        listDom.scrollHeight - scrollOffset - listDom.clientHeight < 300
      if (bottom && !loading) {
        scrollToBottomCallback()
      }
    }
  }

  const itemSize = (index: number) => {
    const item = dataList[index]
    if (item.type === 'data') {
      const rowHeight = item[0].height
      return rowHeight
    } else if (item.type === 'loading') {
      return LOADING_HEIGHT
    } else if (item.type === 'noMoreData') {
      return NO_MORE_DATA_HEIGHT
    }
    return 0
  }

  const itemKey = (index: number) => {
    return index
  }

  const onClickItem = useCallback(
    (item: WaterFallDataItem) => {
      if (selectedItem.current === item) {
        //
      } else {
        selectedItem.current = item
      }
      setDataList([...dataList])
    },
    [dataList]
  )

  useEffect(() => {
    if (forwardRef) {
      forwardRef({
        focusFirst: () => {
          //@ts-ignore
          const firstItem = dataList?.[0]?.[0]
          if (firstItem) {
            onClickItem(firstItem)
          }
        },
        closeDetail: () => {
          selectedItem.current = undefined
        },
      })
    }
  }, [dataList, forwardRef, onClickItem])

  const stepData = createStepData(
    dataList,
    gutter,
    selectedItem,
    onClickItem,
    render
  )

  return (
    <Resize onResize={handleResize}>
      <div className={cls(className, `${PREFIX}-wrapper`)} ref={wrapper}>
        <AutoSizer>
          {({ height, width }) => {
            return (
              <List
                ref={listRef}
                onScroll={onScroll}
                useIsScrolling
                className="List"
                height={height}
                itemCount={dataList.length}
                itemData={stepData}
                itemKey={itemKey}
                itemSize={itemSize}
                width={width}
              >
                {Row}
              </List>
            )
          }}
        </AutoSizer>
      </div>
    </Resize>
  )
}

export default React.memo(WaterFall)
