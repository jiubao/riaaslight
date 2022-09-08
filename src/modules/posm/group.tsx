import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { LocationStarIcon } from '../../components/icons'
import { PNGIcon } from '../../components/icons/pngIcon'
// import { CropImage } from '../../components/image/cropImage'
import { Masonry } from '../../components/masonry'
// import { MasonryImage } from '../../components/masonry/image'
// import { MasonryImage } from '../../components/masonry/image'
import { IPosmShot, IRetailer } from '../../domain'
import { PngIconType } from '../../domain/icon'
import { selectAllRetailers } from '../../store/commonSlice'
// import './index.scss'

interface IProps {
  month: string
  shots: IPosmShot[]
  onClick?: (shot: IPosmShot) => void
}

const PREFIX = 'PosmShotGroup'

export const PosmShotGroup: React.FC<IProps> = ({ month, shots, onClick }) => {
  const retailers = useSelector(selectAllRetailers)

  const retailerHash = useMemo(() => {
    // const hash = new Map()
    const hash: Record<string, IRetailer> = {}
    retailers.forEach((item) => (hash[item.id] = item))
    return hash
  }, [retailers])

  const Row = ({ index }: { index: number }) => {
    const shot = shots[index]
    return (
      <div className={`${PREFIX}-imgWrap`} onClick={() => onClick?.(shot)}>
        {/* <CropImage src={shot.img_url} position={shot.position} /> */}
        {/* <CropImage src={shot.thumbnail_url} position={shot.position} /> */}
        {/* <MasonryImage src={shot.crop_url} alt="" /> */}
        <img src={shot.crop_url} alt="" />

        <div className={`${PREFIX}-info`} data-id={shot.retailer_id}>
          <div className={`${PREFIX}-infoItem flexCore`}>
            <LocationStarIcon width="24" height="24" />
            {`${shot.store_city},${shot.store_state_or_province}`}
          </div>
          {retailerHash[shot.retailer_id] && (
            <div
              className={`${PREFIX}-infoItem flexCore`}
              data-id={shot.retailer_id}
            >
              <PNGIcon
                name={retailerHash[shot.retailer_id]?.retailer_name}
                type={PngIconType.Retailer}
              />
              {retailerHash[shot.retailer_id]?.retailer_name}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-month`} data-month={month}></div>
      <Masonry columnCount={5} total={shots.length} gutter={20}>
        {Row}
      </Masonry>
    </div>
  )
}
