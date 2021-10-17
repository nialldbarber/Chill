import React, {useEffect} from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function Spinner() {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    outer: {
      position: 'relative',
      width: wp('6%'),
      height: wp('6%'),
      backgroundColor: colors.background,
      borderWidth: wp('1%'),
      borderRadius: wp('50%'),
      borderColor: colors.text,
    },
  });

  const size = useSharedValue(0.5);

  const sizeStyles = useAnimatedStyle(() => ({
    transform: [{scale: size.value}],
  }));

  useEffect(() => {
    size.value = withRepeat(
      withSequence(withSpring(1), withSpring(0.5)),
      -1,
      true,
    );
  }, [size]);

  return <Animated.View style={[styles.outer, sizeStyles]} />;
}
