interface IDocument {
  id: number
}

interface IPaginationRequest {
  start: number
  limit: number
}

export enum StatusEnum {
  Active = 0,
}

export interface ICategory extends IDocument {
  category_name: string
  category_status: StatusEnum
}

export interface IBrand extends IDocument {
  brand_name: string
  brand_status: StatusEnum
  brand_icon: string | null // todo: icon name?
}

export interface IRetailer extends IDocument {
  retailer_name: string
  retailer_status: StatusEnum
  owner_name: string | null
  retailer_icon: string | null // todo: icon name?
  retailer_color: string | null
}

export interface IStore {
  store_id: number
  store_status: StatusEnum
  store_name: string
  store_address: string
  store_city: string
  store_state_or_province: string
  store_country: string
  store_region: string
  store_latitude: number
  store_longitude: number
  retailer_id: number
  latest_img_at: string
  latest_preview_img_url: string
  latest_img_url: string
}

export interface IStoreRequest extends IPaginationRequest {
  brand: number
  category: number
  location_range: string
}
