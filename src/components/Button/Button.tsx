import React from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Btn from '~/components/helpers/Button';

type ActionButtonProps = {
  text?: string;
  error?: boolean;
  onPress?: () => void;
};

export default function ActionButton({
  text,
  onPress,
  error,
}: ActionButtonProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    btn: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp('5%'),
      width: wp('85%'),
      borderRadius: 25,
      backgroundColor: colors.text,
    },
    errorBtn: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp('5%'),
      width: wp('85%'),
    },
    text: {
      color: colors.background,
      fontSize: wp('5%'),
    },
    errorText: {
      color: colors.text,
      fontSize: wp('4%'),
      marginBottom: hp('3%'),
    },
  });

  return (
    <Btn style={error ? styles.errorBtn : styles.btn} onPress={onPress}>
      <Text style={error ? styles.errorText : styles.text}>{text}</Text>
    </Btn>
  );
}
