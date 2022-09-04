import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { ISku, IPriceMap } from '../domain'

class SkuService {
  get(params: { category: string; country: string }) {
    return HttpService.get<ISku[]>(`${BASE_SERVICE_URI}/skus`, {
      status: 'active',
      start: 0,
      limit: 5000,
      ...params,
      // mock
      category: 1,
      brand: '1988,1964',
      country: 'Philippines',
    })
  }
  getSkuPriceMap(params: Pick<ISku, 'sku_id'>) {
    return HttpService.get<IPriceMap>(
      `${BASE_SERVICE_URI}/skus/${params.sku_id}/price`
    )
  }
}

export const skuService = new SkuService()
