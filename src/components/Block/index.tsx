import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AnimatedText from '~/components/Text';
import {FEELINGS_COLOR_MAP} from '~/constants/exercises';

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
      padding: 10,
      borderRadius: 30,
      marginHorizontal: 10,
      marginVertical: 10,

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
      left: 10,
      top: 10,
    },
    blockIndicator: {
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: 40,
      top: hp('9%'),
      right: wp('1%'),
      backgroundColor: colors[FEELINGS_COLOR_MAP[category]],
      transform: [{rotate: '180deg'}],
    },
  });

  const navigation = useNavigation();
  const scale = useSharedValue<number>(1);

  const blockHover = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      scale.value = withTiming(1);
    });
    return unsubscribe;
  }, [navigation, scale]);

  return (
    <Animated.View style={[{...styles.block}, blockHover]}>
      <SharedElement id={id}>
        <Animated.View style={[styles.blockIndicator]} />
      </SharedElement>
      <TouchableOpacity
        style={styles.blockWrapper}
        activeOpacity={1}
        onPress={() => {
          onPress && onPress();
          scale.value = withSpring(1);
        }}
        onPressIn={() => (scale.value = withSpring(1.05))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        <SharedElement id={title}>
          <AnimatedText style={styles.blockText}>{title}</AnimatedText>
        </SharedElement>
      </TouchableOpacity>
    </Animated.View>
  );
}
