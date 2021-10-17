import React, {ReactChild} from 'react';

import {TouchableOpacity} from 'react-native';

type BtnProps = {
  children: ReactChild;
  style?: any;
  disabled?: boolean;
  hitSlop?: number;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

export default function Btn({
  children,
  style,
  disabled,
  hitSlop,
  onPress,
  onPressIn,
  onPressOut,
}: BtnProps) {
  return (
    <TouchableOpacity
      {...{style, disabled, hitSlop, onPress, onPressIn, onPressOut}}
      hitSlop={{
        top: hitSlop,
        bottom: hitSlop,
        left: hitSlop,
        right: hitSlop,
      }}
      activeOpacity={1}
    >
      {children}
    </TouchableOpacity>
  );
}
