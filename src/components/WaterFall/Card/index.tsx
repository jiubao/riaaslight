import { WaterFallDataItem } from '../interface';
import React, { PropsWithChildren } from 'react';
import cls from 'classnames';
import './index.scss';

const PREFIX = 'WaterFallCard';

interface IProps {
  className?: string;
  gutter: number;
  data: WaterFallDataItem;
}

const Card = function WaterFallCard(props: PropsWithChildren<IProps>) {
  const { data, gutter, children, className } = props;
  const { width, height } = data;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        padding: `${gutter}px`,
      }}
      className={cls(className, PREFIX)}
    >
      <div className={`${PREFIX}-body`}>{children}</div>
    </div>
  );
};

export default React.memo(Card);
