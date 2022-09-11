import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { union } from 'lodash'
import { RootState } from '.'
import { IPrice, IPriceMap, ISku } from '../domain'
import { skuService } from '../services/sku'

export type IPriceWithRetailer = {
  retailerId: string
} & IPrice
interface IState {
  skuListLoading: boolean
  noMoreSku: boolean
  searchParams: {
    start: number
    limit: number
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
  skuListLoading: false,
  noMoreSku: false,
  searchParams: {
    start: 0,
    limit: 100,
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
  async (startFromScratch: boolean, api) => {
    if (startFromScratch) {
      api.dispatch(
        update({
          noMoreSku: false,
          skuList: [],
        })
      )
    }
    const state = api.getState() as RootState
    if (state.price.noMoreSku) return
    api.dispatch(
      update({
        skuListLoading: true,
      })
    )
    let params: any = {
      start: startFromScratch ? 0 : state.price.skuList.length,
      limit: state.price.searchParams.limit,
    }
    if (state.price.searchParams.country !== 'All') {
      params.country = state.price.searchParams.country
    }
    if (state.price.searchParams.category !== 'All') {
      params.category = state.price.searchParams.category
    }
    try {
      const res = await skuService.get(params)
      let noMoreSku = Array.isArray(res) && res.length ? false : true
      api.dispatch(
        update({
          skuListLoading: false,
          noMoreSku,
          skuList: !noMoreSku
            ? [...state.price.skuList, ...res]
            : state.price.skuList,
        })
      )
    } catch (error) {
      api.dispatch(
        update({
          skuListLoading: false,
        })
      )
    }
  }
)

export const fetchPriceMap = createAsyncThunk(
  'common/fetchPriceMap',
  async (skuInfo: ISku, api) => {
    api.dispatch(
      updatePrice({
        loading: true,
      })
    )
    try {
      const res = await skuService.getSkuPriceMap({ sku_id: skuInfo.sku_id })
      // 获取可选月份
      let dateList: string[] = []

      Object.keys(res || {}).forEach((key) => {
        const dates = Object.keys(res[key])
        dateList.push(...dates)
      })
      dateList = union(dateList)
      const retailerList = Object.keys(res)
      api.dispatch(
        updatePrice({
          dateList,
          skuInfo,
          loading: false,
          priceMap: res || {},
          retailerList,
          leftRetailer: retailerList[0] || '',
          rightRetailer: retailerList[1] || retailerList[0] || '',
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
  extraReducers(builder) {},
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
export const skuListLoadingSelector = (state: RootState) =>
  state.price.skuListLoading
export const noMoreSkuSelector = (state: RootState) => state.price.noMoreSku
