import React from 'react';

import {StyleSheet, TextStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {H} from '~/components/typography/Heading';
import {fixedColors} from '~/styles/theme';

type TitleProps = {
  text?: string;
  style?: TextStyle;
};

export default function Title({text, style}: TitleProps) {
  const styles = StyleSheet.create({
    title: {
      fontSize: wp('12%'),
      textAlign: 'center',
      paddingBottom: hp('1%'),
      color: fixedColors.white,
    },
  });

  return (
    <Animated.View style={style}>
      <H style={styles.title}>{text}</H>
    </Animated.View>
  );
}
