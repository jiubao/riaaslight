import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IShelfShot, IShelfShotRequest } from '../domain'

class ShelfShotService {
  get(params: IShelfShotRequest) {
    return HttpService.get<IShelfShot[]>(
      `${BASE_SERVICE_URI}/shelfshots`,
      params
    )
  }
}

export const shelfShotService = new ShelfShotService()
