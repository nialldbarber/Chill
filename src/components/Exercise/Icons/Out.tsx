import React from 'react';
import Svg, {Circle, Rect, Path} from 'react-native-svg';

export default function BreatheOut() {
  return (
    <Svg width={47} height={45} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle
        cx={24.5}
        cy={20.5}
        r={19.5}
        fill="#F7D075"
        stroke="#F3AF29"
        strokeWidth={2}
      />
      <Rect x={28} y={13} width={3} height={8} rx={1.5} fill="#F3AF29" />
      <Rect x={18} y={13} width={3} height={8} rx={1.5} fill="#F3AF29" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.66 26.22c.05 2.332.318 4.45.82 6.339.49 1.833 1.3 3.279 2.564 4.392 3.66 3.224 10.896 1.486 10.896 1.486l-.295-2.667 5.143 3.536-4.232 4.712-.245-2.218s-7.16 1.41-11.626-2.98c-2.646-2.601-3.703-6.863-3.508-12.533.019-.02.337-.07.483-.067zM20.02 26.502c-.049 2.332-.317 4.45-.82 6.338-.489 1.834-1.299 3.28-2.563 4.393-3.66 3.224-10.896 1.486-10.896 1.486l.295-2.667-5.143 3.536L5.125 44.3l.245-2.217s7.16 1.409 11.626-2.981c2.646-2.601 3.703-6.863 3.508-12.533-.019-.02-.337-.07-.483-.067z"
        fill="#F3AF29"
      />
    </Svg>
  );
}
