import React from 'react';

import {StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {FORM_ERRORS} from '~/constants/errors';
import {fixedColors} from '~/styles/theme';

type ErrorTextProps = {
  text?: string;
};

export default function ErrorText({text}: ErrorTextProps) {
  const styles = StyleSheet.create({
    errorText: {
      color: fixedColors.error,
      fontSize: wp('3.2%'),
      marginTop: hp('-0.5%'),
      marginLeft: wp('1%'),
      marginBottom: hp('2%'),
      textAlign: 'center',
    },
  });

  return <Text style={styles.errorText}>{FORM_ERRORS[text]}</Text>;
}
