import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IPosmShot, IPosmShotRequest } from '../domain'

class PosmService {
  get(params?: IPosmShotRequest) {
    return HttpService.get<IPosmShot[]>(`${BASE_SERVICE_URI}/posmshots`, params)
  }
}

export const posmService = new PosmService()
