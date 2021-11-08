import React, {useEffect} from 'react';

import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Wrapper from '~/components/Layout/Wrapper';
import {fixedColors} from '~/styles/theme';
import {haptics} from '~/utils/haptics';

export default function Loader({active}: {active: boolean}) {
  const styles = StyleSheet.create({
    container: {
      height: hp('5%'),
      display: 'flex',
      flexDirection: 'row',
    },
    circle: {
      backgroundColor: fixedColors.white,
      width: hp('1.3%'),
      height: hp('1.3%'),
      marginHorizontal: wp('1%'),
      borderRadius: wp('50%'),
    },
  });

  const circleOne = useSharedValue<number>(1);
  const circleTwo = useSharedValue<number>(1);
  const circleThree = useSharedValue<number>(1);

  const circleOneStyles = useAnimatedStyle(() => ({
    opacity: circleOne.value,
  }));

  const circleTwoStyles = useAnimatedStyle(() => ({
    opacity: circleTwo.value,
  }));

  const circleThreeStyles = useAnimatedStyle(() => ({
    opacity: circleThree.value,
  }));

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        circleThree.value = withTiming(0);
        haptics.impactHeavy();
      }, 1000);
      setTimeout(() => {
        circleTwo.value = withTiming(0);
        haptics.impactHeavy();
      }, 2000);
      setTimeout(() => {
        circleOne.value = withTiming(0);
        haptics.impactHeavy();
      }, 3000);
    }
  }, [active, circleOne, circleTwo, circleThree]);

  return (
    <Wrapper style={styles.container}>
      <Animated.View style={[styles.circle, circleOneStyles]} />
      <Animated.View style={[styles.circle, circleTwoStyles]} />
      <Animated.View style={[styles.circle, circleThreeStyles]} />
    </Wrapper>
  );
}
