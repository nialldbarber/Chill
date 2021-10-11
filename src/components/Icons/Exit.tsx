import React from 'react';

import Svg, {Path} from 'react-native-svg';

export default function Exit({style, fill}: {style?: any; fill?: string}) {
  return (
    <Svg height={24} width={24} fill={fill || '#2D3047'} style={style}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </Svg>
  );
}
