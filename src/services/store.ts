import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IStore, IStoreDetail, IStoreRequest } from '../domain'

class StoreService {
  get(params: IStoreRequest) {
    return HttpService.get<IStore[]>(`${BASE_SERVICE_URI}/stores`, params)
  }
  getById(id: number) {
    return HttpService.get<IStoreDetail>(`${BASE_SERVICE_URI}/stores/${id}`)
  }
}

export const storeService = new StoreService()
