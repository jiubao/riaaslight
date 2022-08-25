import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IStore, IStoreRequest } from '../domain'

class StoreService {
  get(params: IStoreRequest) {
    return HttpService.get<IStore[]>(`${BASE_SERVICE_URI}/stores`, params)
  }
}

export const storeService = new StoreService()
