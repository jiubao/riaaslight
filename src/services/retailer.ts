import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IRetailer } from '../domain'

class RetailerService {
  get() {
    return HttpService.get<IRetailer[]>(`${BASE_SERVICE_URI}/retailers`, {
      status: 'active',
    })
  }
}

export const retailerService = new RetailerService()
