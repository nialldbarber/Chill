import React from 'react';

import {StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {fixedColors} from '~/styles/theme';

type ErrorTextProps = {
  text?: string;
};

export default function ErrorText({text}: ErrorTextProps) {
  const styles = StyleSheet.create({
    text: {
      color: fixedColors.error,
      fontSize: wp('4%'),
      marginBottom: hp('2%'),
    },
  });

  return <Text style={styles.text}>{text}</Text>;
}
