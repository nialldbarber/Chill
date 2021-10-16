import React, {ReactChild} from 'react';

import {TouchableOpacity} from 'react-native';

type BtnProps = {
  children: ReactChild;
  style?: any;
  disabled?: boolean;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

export default function Btn({
  children,
  style,
  disabled,
  onPress,
  onPressIn,
  onPressOut,
}: BtnProps) {
  return (
    <TouchableOpacity
      {...{style, disabled, onPress, onPressIn, onPressOut}}
      hitSlop={{
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
      }}
      activeOpacity={1}
    >
      {children}
    </TouchableOpacity>
  );
}
