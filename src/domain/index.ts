import { PositionType } from './shape'

export interface IDocument {
  id: number
}

interface IPaginationRequest {
  start?: number
  limit?: number
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
  store_latitude: number
  store_longitude: number
}
export interface IStoreDetail extends IStore {
  store_status: StatusEnum
  store_name: string
  store_address: string
  store_city: string
  store_state_or_province: string
  store_country: string
  store_region: string
  retailer_id: number
  latest_img_at: string
  latest_preview_img_url: string
  latest_img_url: string
  brand_map: Record<string, number>
  category_map: Record<string, number>
}

export interface IStoreRequest extends IPaginationRequest {
  brand: string | number
  category: string | number
  location_range: string
  field_set: string
}

export interface IShelfShot extends IDocument {
  store_id: number
  retailer_id: number
  visit_date: string
  img_url: string
  preview_img_url: string
  shelf_num: number
}

export interface IShelfShotRequest extends IPaginationRequest {
  store_id?: number
  category?: string // 1,2,3
  brand?: string // 1,2,3
}

// export type ShelfPosition = [number, number, number, number]
export interface IShelfShotDetail extends IShelfShot {
  brand_map: Record<string, PositionType[]>
  category_map: Record<string, PositionType[]>
  survey: string
}

export interface IPosmShot extends IDocument {
  store_id: number
  retailer_id: number
  category_id: number
  brand_id: number
  posm_internal_id: number
  posm_name: string
  img_id: string
  img_url: string
  thumbnail_url: string
  visit_date: string
  store_city: string
  store_state_or_province: string
  position: PositionType
}

export interface IPosmShotRequest extends IPaginationRequest {
  brand?: number
  category?: number
  retailer?: number | ''
  region?: RegionEnum
  store_id?: number
}

// export type RegionType = 'NA' | 'SEA'

export enum RegionEnum {
  NA = 'NA',
  SEA = 'SEA',
}
