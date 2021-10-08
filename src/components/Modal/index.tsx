import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Btn from '~/components/Button';

type ModalIconProps = {
  modalScreen: any;
  mode: string;
};

export default function ModalIcon({modalScreen}: ModalIconProps) {
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
    <Btn onPress={() => navigate(modalScreen)} style={styles.modal}>
      <Text>MODAL</Text>
    </Btn>
  );
}
