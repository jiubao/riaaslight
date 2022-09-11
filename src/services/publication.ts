import { HttpService } from '.'
import { BASE_SERVICE_URI } from '../constants'
import { IPublication, IPublicationRequest, IPublisher } from '../domain'

class PublicationService {
  getPublishers() {
    return HttpService.get<IPublisher[]>(
      `${BASE_SERVICE_URI}/publishers?status=active`
    ).then((res) => {
      return res?.filter((item) => !!item.publisher_icon) || []
    })
  }
  getPublications(params: IPublicationRequest) {
    return HttpService.get<IPublication[]>(
      `${BASE_SERVICE_URI}/publications`,
      params
    )
  }
}

export const publicationService = new PublicationService()
