import React from 'react';

import Svg, {Path} from 'react-native-svg';

import {fixedColors} from '~/styles/theme';

type ColorProps = {
  mode?: string;
};

export default function BackIcon({mode = 'dark'}: ColorProps) {
  return (
    <Svg
      height={24}
      width={24}
      fill={mode === 'dark' ? fixedColors.white : fixedColors.black}
    >
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </Svg>
  );
}
