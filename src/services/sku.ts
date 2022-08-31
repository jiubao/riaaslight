import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { ISku } from '../domain'

class SkuService {
  get(params: { category: string; country: string }) {
    return HttpService.get<{ data: ISku[]; code: number }>(
      `${BASE_SERVICE_URI}/skus`,
      {
        status: 'active',
        start: 0,
        limit: 5000,
        ...params,
        // mock
        category: 1,
        brand: '1988,1964',
        country: 'Philippines',
      }
    )
  }
}

export const skuService = new SkuService()
