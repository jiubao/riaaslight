import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IBrand, ICategory } from '../domain'

class CategoryService {
  get() {
    return HttpService.get<ICategory[]>(`${BASE_SERVICE_URI}/categories`, {
      status: 'active',
    })
  }
}

export const categoryService = new CategoryService()
