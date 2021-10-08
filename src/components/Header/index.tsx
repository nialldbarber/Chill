import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {timeOfDayGreeting} from '~/utils/get-date';
import animation from '~/assets/landscape.json';

export default function Header() {
  const {colors, normalize} = useTheme() as any;

  const styles = StyleSheet.create({
    header: {
      marginTop: hp('8%'),
      paddingHorizontal: wp('7%'),
    },
    greeting: {
      fontSize: wp('10%'),
      width: wp('50%'),
      color: colors.text,
    },
    animation: {
      alignSelf: 'center',
      width: normalize(320, 400),
    },
    question: {
      fontSize: wp('4.5%'),
      color: colors.text,
    },
  });

  const greetingOpacity = useSharedValue<number>(0);
  const questionOpacity = useSharedValue<number>(0);

  const greetingStyle = useAnimatedStyle(() => ({
    opacity: greetingOpacity.value,
  }));

  const questionStyle = useAnimatedStyle(() => ({
    opacity: questionOpacity.value,
  }));

  useEffect(() => {
    const duration = 1000;
    greetingOpacity.value = withTiming(1, {duration});
    questionOpacity.value = withDelay(duration, withTiming(1, {duration}));
  }, [greetingOpacity, questionOpacity]);

  return (
    <View style={styles.header}>
      <Animated.Text style={[styles.greeting, greetingStyle]}>
        {timeOfDayGreeting()}
      </Animated.Text>
      <LottieView autoPlay loop style={styles.animation} source={animation} />
      <Animated.Text style={[styles.question, questionStyle]}>
        How would you like to feel today?
      </Animated.Text>
    </View>
  );
}
