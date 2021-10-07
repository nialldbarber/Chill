import React from 'react';
import Svg, {Circle, Rect} from 'react-native-svg';

export default function Hold() {
  return (
    <Svg width={41} height={41} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle
        cx={20.5}
        cy={20.5}
        r={19.5}
        fill="#F7D075"
        stroke="#F3AF29"
        strokeWidth={2}
      />
      <Rect x={24} y={13} width={3} height={14} rx={1.5} fill="#F3AF29" />
      <Rect x={14} y={13} width={3} height={14} rx={1.5} fill="#F3AF29" />
    </Svg>
  );
}
