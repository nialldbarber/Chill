import React, {useEffect} from 'react';

import {useNavigation, useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SharedElement} from 'react-navigation-shared-element';

import Btn from '~/components/helpers/Button';
import {FEELINGS_COLOR_MAP} from '~/constants/exercises';
import {fixedColors} from '~/styles/theme';

type BlockProps = {
  id?: string;
  title: string;
  category?: string;
  onPress?: () => void;
};

export default function Block({id, title, category = '', onPress}: BlockProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    block: {
      position: 'relative',
      width: wp('42%'),
      height: hp('17%'),
      backgroundColor: colors.background,
      padding: wp('2.5%'),
      borderRadius: 30,
      margin: wp('2.5%'),
      shadowColor: colors.border,
      shadowOffset: {
        width: 1,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    blockWrapper: {
      height: '100%',
      width: '100%',
    },
    blockText: {
      color: colors.text,
      fontSize: wp('5%'),
      fontWeight: '300',
      position: 'absolute',
      left: wp('3%'),
      top: hp('1.2%'),
    },
    blockIndicator: {
      position: 'absolute',
      width: wp('11.5%'),
      height: wp('11.5%'),
      borderRadius: wp('50%'),
      top: hp('9%'),
      right: wp('1%'),
      backgroundColor: fixedColors[FEELINGS_COLOR_MAP[category]],
      transform: [{rotate: '180deg'}],
    },
  });

  const {addListener} = useNavigation();
  const scale = useSharedValue<number>(1);

  const blockHover = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      scale.value = withTiming(1);
    });
    return unsubscribe;
  }, [scale]);

  return (
    <Animated.View style={[styles.block, blockHover]}>
      <SharedElement id={id ?? ''}>
        <Animated.View style={[styles.blockIndicator]} />
      </SharedElement>
      <Btn
        style={styles.blockWrapper}
        onPress={() => {
          onPress && onPress();
          scale.value = withSpring(1);
        }}
        onPressIn={() => (scale.value = withSpring(1.05))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        <SharedElement id={title}>
          <Animated.Text style={styles.blockText}>{title}</Animated.Text>
        </SharedElement>
      </Btn>
    </Animated.View>
  );
}
