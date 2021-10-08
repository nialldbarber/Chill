import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {fixedColors} from '~/styles/theme';

export default function Spinner() {
  const styles = StyleSheet.create({
    outer: {
      position: 'relative',
      width: wp('6%'),
      height: wp('6%'),
      backgroundColor: fixedColors.white,
      borderWidth: wp('1%'),
      borderRadius: wp('50%'),
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
      true
    );
  }, []);

  return <Animated.View style={[styles.outer, sizeStyles]} />;
}
