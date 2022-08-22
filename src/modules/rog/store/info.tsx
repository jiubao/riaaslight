import { SvgIcon } from '@mui/material'
import React from 'react'
import { BizUnit } from '../../../components/BizUnit'
import { Brands } from '../../../mock/retailer'
import { BrandList } from '../list/brand'
import { CategoryList } from '../list/category'
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import GitHubIcon from '@mui/icons-material/GitHub'
// import PlaceIcon from '@mui/icons-material/Place'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined'
import { useNavigate } from 'react-router'

const PREFIX = 'StoreInfo'

export const StoreInfo: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-header`}>
        <SvgIcon
          component={ArrowBackIosNewOutlinedIcon}
          className={`${PREFIX}-back`}
          fontSize="large"
          onClick={() => navigate('/rog')}
        />
        <div className={`${PREFIX}-brand flex middle`}>
          <SvgIcon component={GitHubIcon} fontSize="large" />
          <span>Github</span>
        </div>
        <div className={`${PREFIX}-location flex middle`}>
          <SvgIcon component={PlaceOutlinedIcon} />
          <span>Walterboro,South Carolina,US</span>
        </div>
      </div>

      <span className={`${PREFIX}-title`}>CATEGORY</span>
      <CategoryList list={Brands} />
      <span className={`${PREFIX}-title`}>BRAND</span>
      <BrandList list={Brands} />
      <span className={`${PREFIX}-title`}>PHOTO TYPE</span>
      <div className="BizUnit-list">
        <BizUnit text={'Shelf/ Cooler Photos'} pure={true} />
        <BizUnit text={'POSM'} pure={true} />
      </div>
    </div>
  )
}
