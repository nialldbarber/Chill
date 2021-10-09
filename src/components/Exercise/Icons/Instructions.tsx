import React, {ReactChild} from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type InstructionsProps = {
  icon: ReactChild;
  title: string;
  instructions: number;
};

export default function Instructions({
  icon,
  title,
  instructions,
}: InstructionsProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      width: wp('23%'),
    },
    icon: {
      height: hp('7%'),
    },
    textHeader: {
      fontSize: wp('3.5%'),
      fontWeight: '700',
      color: colors.text,
    },
    textContent: {
      fontSize: wp('3%'),
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.textHeader}>{title}</Text>
      <Text style={styles.textContent}>{instructions} seconds</Text>
    </View>
  );
}
