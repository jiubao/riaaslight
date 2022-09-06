import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { union } from 'lodash'
import { RootState } from '.'
import { IPrice, IPriceMap, ISku } from '../domain'
import { skuService } from '../services/sku'

export type IPriceWithRetailer = {
  retailerId: string
} & IPrice
interface IState {
  searchParams: {
    category: string
    country: string
  }
  skuList: ISku[]
  price: {
    loading: boolean
    dateList: string[]
    selectedDate: string
    priceMap: IPriceMap
    retailerPriceForSelectedDate: IPriceWithRetailer[]
    skuInfo?: ISku
    retailerList: string[]
    leftRetailer: string
    rightRetailer: string
  }
}

const initialState: IState = {
  searchParams: {
    category: '',
    country: '',
  },
  skuList: [],
  price: {
    loading: false,
    skuInfo: undefined,
    retailerPriceForSelectedDate: [],
    priceMap: {},
    dateList: [],
    selectedDate: '',
    retailerList: [],
    leftRetailer: '',
    rightRetailer: '',
  },
}

export const fetchSkuList = createAsyncThunk(
  'common/fetchSkuList',
  async (_, api) => {
    const state = api.getState() as RootState
    if (state.price.skuList.length) {
      return state.price.skuList
    }
    const res = await skuService.get(state.price.searchParams)
    if (res && Array.isArray(res)) {
      return res
    }
    return []
  }
)
export const fetchPriceMap = createAsyncThunk(
  'common/fetchPriceMap',
  async (skuInfo: ISku, api) => {
    const state = api.getState() as RootState
    api.dispatch(
      updatePrice({
        loading: true,
      })
    )
    try {
      const res = await skuService.getSkuPriceMap({ sku_id: skuInfo.sku_id })
      // 获取可选月份
      let dateList: string[] = []

      Object.keys(res || {}).map((key) => {
        const dates = Object.keys(res[key])
        dateList.push(...dates)
      })
      dateList = union(dateList)
      api.dispatch(
        updatePrice({
          dateList,
          skuInfo,
          loading: false,
          priceMap: res,
          retailerList: Object.keys(res),
        })
      )
      api.dispatch(updateSelectedDate(dateList[dateList.length - 1]))
      // 更新price数据
      return res
    } catch (error) {
      api.dispatch(
        updatePrice({
          loading: false,
          priceMap: {},
        })
      )
    }
  }
)

const getPriceInfoByDate = (date: string, priceMap: IPriceMap) => {
  return Object.keys(priceMap || {}).reduce((out, retailerId) => {
    const retailerPriceInfo = priceMap[retailerId]
    if (retailerPriceInfo[date]) {
      out.push({
        retailerId,
        ...retailerPriceInfo[date],
      })
    }
    return out
  }, [] as IPriceWithRetailer[])
}

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    updatePrice(state, action: PayloadAction<Partial<IState['price']>>) {
      return {
        ...state,
        price: {
          ...state.price,
          ...action.payload,
        },
      }
    },
    updateSelectedDate(state, action: PayloadAction<string>) {
      return {
        ...state,
        price: {
          ...state.price,
          selectedDate: action.payload,
          retailerPriceForSelectedDate: getPriceInfoByDate(
            action.payload,
            state.price.priceMap
          ),
        },
      }
    },
    updateParams(
      state,
      action: PayloadAction<Partial<IState['searchParams']>>
    ) {
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSkuList.fulfilled, (state, action) => {
      state.skuList = action.payload
    })
  },
})

export const { update, updatePrice, updateParams, updateSelectedDate } =
  priceSlice.actions

export default priceSlice.reducer

export const selectSearchParams = (state: RootState) => state.price.searchParams
export const skuList = (state: RootState) => state.price.skuList
export const priceInfo = (state: RootState) => state.price.price
export const retailerListSelector = (state: RootState) =>
  state.price.price.retailerList
export const leftRetailerSelector = (state: RootState) =>
  state.price.price.leftRetailer
export const rightRetailerSelector = (state: RootState) =>
  state.price.price.rightRetailer
export const priceMapSelector = (state: RootState) => state.price.price.priceMap
