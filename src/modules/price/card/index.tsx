import { useLayoutEffect, useRef } from 'react'
import React, { useEffect, useState } from 'react'
import cls from 'classnames'
import './index.scss'
import { WaterFallDataItem } from '../../../components/WaterFall/interface'
import { useHideWhenChildExceedRow } from './useHideWhenChildExceedRow'
const PREFIX = 'SkuCard'

interface IProps<T> {
  className?: string
  data: T
  url: string
  onClick?: (item: any) => void
  showDetail: (data: T) => void
}

function SkuCard<T extends WaterFallDataItem>(props: IProps<T>) {
  const { className, url, data } = props
  const [detailVisible, setDetailVisible] = useState<boolean>(false)
  const dataRef = useRef<any>(data)
  const detailRef = useRef<HTMLDivElement>(null)
  const replaceRef = useRef<HTMLDivElement>(null)
  const [skuNameList, setSkuNameList] = useState<string[]>([])
  const [proxyUrl, setProxyUrl] = useState<string | undefined>(
    data?.loaded ? url : undefined
  )

  // 通过new Image 加载图片,等图片加载完了,UriImageWithLoading再展示
  // 这里是为了组件销毁时,如果图片请求还没完成则取消请求,通过设置src为空字符串实现请求取消
  useEffect(() => {
    if (!dataRef.current.loaded) {
      const img = new Image()
      img.src = url
      img.onload = () => {
        dataRef.current.loaded = true
        setProxyUrl(url)
      }
      img.onerror = () => {
        setProxyUrl(url)
      }
      return () => {
        img.src = ''
      }
    }
    return
  }, [url])

  const handleClick = () => {
    props.onClick?.(data)
  }
  const onMouseEnter = () => {
    setDetailVisible(true)
    if (!skuNameList.length) {
      setSkuNameList(data.sku_name.split(/\s/).map((i: string) => i + ' '))
    }
  }
  const onMouseLeave = () => {
    setDetailVisible(false)
  }
  useHideWhenChildExceedRow(
    {
      ref: detailRef,
      childSelector: `.text`,
      replaceRef: replaceRef,
    },
    [detailVisible]
  )
  const goDetail = () => {
    props.showDetail(data)
  }
  return (
    <div
      className={cls(`${PREFIX}`, className, { active: detailVisible })}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        className={cls(`${PREFIX}-img`, { hidden: !proxyUrl })}
        src={proxyUrl}
        alt=""
      />
      {detailVisible && (
        <div className={`${PREFIX}-detail`}>
          <div ref={detailRef} className={`${PREFIX}-detailContent`}>
            {skuNameList.map((i, index) => (
              <span className="text" key={index}>
                {i}
              </span>
            ))}
            <span className="replace" ref={replaceRef}>
              ...
            </span>
          </div>
          <div className={`${PREFIX}-detailFooter`} onClick={goDetail}>
            {'Details >'}
          </div>
        </div>
      )}
    </div>
  )
}

export default SkuCard
