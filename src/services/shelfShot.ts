import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IShelfShot, IShelfShotDetail, IShelfShotRequest } from '../domain'

class ShelfShotService {
  get(params: IShelfShotRequest) {
    return HttpService.get<IShelfShot[]>(
      `${BASE_SERVICE_URI}/shelfshots`,
      params
    )
  }
  getById(id: number) {
    return HttpService.get<IShelfShotDetail>(
      `${BASE_SERVICE_URI}/shelfshots/${id}`
    )
  }
}

export const shelfShotService = new ShelfShotService()
