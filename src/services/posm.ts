import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IPosmShot, IPosmShotDetail, IPosmShotRequest } from '../domain'

class PosmService {
  get(params?: IPosmShotRequest) {
    return HttpService.get<IPosmShot[]>(`${BASE_SERVICE_URI}/posmshots`, params)
  }
  getDetail(imgId: string) {
    return HttpService.get<IPosmShotDetail>(
      `${BASE_SERVICE_URI}/posm_shelfshots/${imgId}`
    )
  }
}

export const posmService = new PosmService()
