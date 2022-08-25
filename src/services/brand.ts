import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IBrand } from '../domain'

class BrandService {
  get(categoryId: number) {
    return HttpService.get<IBrand[]>(`${BASE_SERVICE_URI}/brands`, {
      status: 'active',
      category: categoryId,
    })
  }
}

export const brandService = new BrandService()
