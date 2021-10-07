import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function BackIcon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} fill="#111">
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </Svg>
  );
}
