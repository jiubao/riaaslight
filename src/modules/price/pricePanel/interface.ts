import { IRetailer } from '../../../domain'
import { IPriceWithRetailer } from '../../../store/priceSlice'

export type IPriceItem = IPriceWithRetailer &
  Pick<IRetailer, 'retailer_color' | 'retailer_icon' | 'retailer_name'>
