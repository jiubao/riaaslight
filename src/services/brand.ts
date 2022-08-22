import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IBrand } from '../domain'

class BrandService {
  get() {
    return HttpService.get<IBrand[]>(`${BASE_SERVICE_URI}/brands`, {
      status: 'active',
    })
  }
}

export const brandService = new BrandService()
