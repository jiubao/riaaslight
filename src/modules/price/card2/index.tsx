import cls from 'classnames'
import { useEffect, useMemo, useRef, useState } from 'react'
import { WaterFallDataItem } from '../../../components/WaterFall/interface'
import './index.scss'
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

  const skuNameList = useMemo(() => {
    return data.sku_name.split(/\s/).map((i: string) => i + ' ')
  }, [data.sku_name])

  const onMouseEnter = () => {
    setDetailVisible(true)
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
    detailVisible
  )
  const goDetail = () => {
    props.showDetail(data)
  }
  return (
    <div
      className={cls(`${PREFIX}`, className, { active: detailVisible })}
      onClick={goDetail}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`${PREFIX}-img-box`}>
        <img
          className={cls(`${PREFIX}-img`, { hidden: !proxyUrl })}
          src={proxyUrl}
          alt=""
        />
      </div>
      <div className={`${PREFIX}-detail`} ref={detailRef}>
        {skuNameList.map((i, index) => (
          <span className="text" key={index}>
            {i}
          </span>
        ))}
        <span className="replace" ref={replaceRef}>
          ...
        </span>
      </div>
      <div className={`${PREFIX}-footer`}>{'Details >'}</div>
    </div>
  )
}

export default SkuCard
