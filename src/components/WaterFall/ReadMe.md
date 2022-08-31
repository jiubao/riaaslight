using Example:

const photos = [
{
url:
'',
width: 200,
height: 164,
sceneUrl:
'',
}];

import { photos } from './const';
import React from 'react';
import RenderImg from './wrapper';
import WaterFall from './waterFall';

interface IProps {}

const CaptureWaterFall: React.FC<IProps> = React.memo(() => {
const callBack = () => {
console.info('bottom');
};
return (
<WaterFall
baseHeight={185}
gutter={3}
detailGutter={13.5}
columnCount={8}
waterFallDataList={photos}
scrollToBottomCallback={callBack}
render={(item: { url: string }) => {
return <RenderImg item={item} />;
}}
/>
);
});
