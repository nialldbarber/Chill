import React from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Btn from '~/components/helpers/Button';
import {P} from '~/components/typography/Paragraph';
import {buttons} from '~/styles/theme';

type ActionButtonProps = {
  text?: string;
  type?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  error?: boolean;
  onPress?: () => void;
  style?: any;
};

export default function ActionButton({
  text,
  type = 'primary',
  error,
  onPress,
  style,
}: ActionButtonProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    btn: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp('6%'),
      width: wp('75%'),
      borderRadius: 25,
      borderWidth: 2,
      ...buttons.background[type],
    },
    errorBtn: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp('5%'),
      width: wp('85%'),
    },
    text: {
      fontSize: wp('4.2%'),
      ...buttons.text[type],
    },
    errorText: {
      color: colors.text,
      fontSize: wp('4%'),
      marginBottom: hp('3%'),
    },
  });

  const scale = useSharedValue(1);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const onPressIn = () => (scale.value = withSpring(1.02));
  const onPressOut = () => (scale.value = withSpring(1));

  return (
    <Btn {...{onPress, onPressIn, onPressOut}}>
      <Animated.View
        style={[error ? styles.errorBtn : styles.btn, style, scaleStyles]}
      >
        <P weight="medium" style={error ? styles.errorText : styles.text}>
          {text}
        </P>
      </Animated.View>
    </Btn>
  );
}
