import React, {useEffect} from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SharedElement} from 'react-navigation-shared-element';

type ExerciseTitleProps = {
  title: string;
  hasBegun: boolean;
};

export default function ExerciseTitle({title, hasBegun}: ExerciseTitleProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: hp('6%'),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: wp('10%'),
      fontWeight: '300',
      color: colors.text,
    },
  });

  const top = useSharedValue(hp('6%'));

  const topStyles = useAnimatedStyle(() => ({
    top: top.value,
  }));

  useEffect(() => {
    if (hasBegun) {
      top.value = withSpring(hp('10%'));
    } else {
      top.value = withSpring(hp('6%'));
    }
  }, [top, hasBegun]);

  return (
    <Animated.View style={[styles.container, topStyles]}>
      <SharedElement id={title}>
        <Text style={styles.title}>{title}</Text>
      </SharedElement>
    </Animated.View>
  );
}
