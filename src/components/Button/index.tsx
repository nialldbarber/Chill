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
      activeOpacity={1}
    >
      {children}
    </TouchableOpacity>
  );
}
