import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { ISku } from '../domain'

class PriceService {
  get(params: { category: string; country: string; search: string }) {
    return HttpService.get<{ data: ISku[]; code: number }>(
      `${BASE_SERVICE_URI}/prices`,
      {
        status: 'active',
        ...params,
      }
    )
  }
}

export const priceService = new PriceService()
