import React, {ReactChild} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Btn from '~/components/helpers/Button';

type ModalIconProps = {
  modalScreen?: any;
  mode?: string;
  style?: any;
  customRoute?: any;
  onPress?: () => void;
  children?: ReactChild;
};

export default function ModalIcon({
  modalScreen,
  style,
  customRoute,
  onPress,
  children,
}: ModalIconProps) {
  const styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      top: hp('7%'),
      right: wp('5%'),
      zIndex: 3,
    },
    back: {
      position: 'absolute',
      top: hp('7%'),
      left: wp('5%'),
    },
  });

  const {navigate} = useNavigation();

  return (
    <Btn
      onPress={() => {
        onPress && onPress();
        customRoute ? customRoute() : navigate(modalScreen);
      }}
      style={[styles.modal, styles.back, style]}
    >
      {children}
    </Btn>
  );
}
