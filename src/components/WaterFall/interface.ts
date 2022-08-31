export interface WaterFallDataItem {
  url: string;
  width: number;
  height: number;
  index?: number;
  row?: number;
  column?: number;
  offsetLeft?: number;
  [key: string]: any;
}

export type IDataItem = WaterFallDataItem[] & { type?: 'data' };
export interface ILoadingItem {
  type: 'loading';
}

export interface INoMoreDataItem {
  type: 'noMoreData';
}
export type RowItem = IDataItem | ILoadingItem | INoMoreDataItem;
