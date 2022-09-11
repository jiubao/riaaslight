import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IPriceMap, ISku } from '../domain'

class SkuService {
  get(params: { category: string; country: string }) {
    return HttpService.get<ISku[]>(`${BASE_SERVICE_URI}/skus`, {
      status: 'active',
      start: 0,
      limit: 5000,
      ...params,
      // mock
      // category: 1,
      // brand: '1988,1964',
      // country: 'Philippines',
    })
  }
  getSkuPriceMap(
    params: Pick<ISku, 'sku_id'> & {
      year_month_start: string
      year_month_end: string
    }
  ) {
    return HttpService.get<IPriceMap>(
      `${BASE_SERVICE_URI}/skus/${params.sku_id}/price`,
      {
        year_month_start: params.year_month_start,
        year_month_end: params.year_month_end,
      }
    )
  }
}

export const skuService = new SkuService()
