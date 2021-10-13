import React, {ReactChild} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Btn from '~/components/helpers/Button';

type ModalIconProps = {
  modalScreen: any;
  mode?: string;
  style?: any;
  customRoute?: any;
  children: ReactChild;
};

export default function ModalIcon({
  modalScreen,
  style,
  customRoute,
  children,
}: ModalIconProps) {
  const styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      top: hp('7%'),
      right: wp('5%'),
      zIndex: 3,
    },
  });

  const {navigate} = useNavigation();

  return (
    <Btn
      onPress={() => {
        customRoute ? customRoute() : navigate(modalScreen);
      }}
      style={[styles.modal, style]}
    >
      {children}
    </Btn>
  );
}
