import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type ModalIconProps = {
  modalScreen: any;
  mode: string;
};

export default function ModalIcon({modalScreen, mode}: ModalIconProps) {
  const {colors} = useTheme();

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
    <TouchableOpacity
      onPress={() => navigate(modalScreen)}
      activeOpacity={1}
      style={styles.modal}
    >
      <Text>MODAL</Text>
    </TouchableOpacity>
  );
}
