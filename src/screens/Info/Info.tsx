import React, {ReactElement, useEffect} from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
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

import Scroll from '~/components/helpers/Scrollview';
import BackIcon from '~/components/Icons/Back';
import ModalIcon from '~/components/Modal/ModalIcon';
import {fixedColors} from '~/styles/theme';

const SCALE = 500.0;
const INITIAL_SCALE = 0;

export default function InfoModalScreen(): ReactElement {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    back: {
      position: 'absolute',
      top: hp('7%'),
      left: wp('5%'),
    },
    infoCircle: {
      backgroundColor: fixedColors.lighterGrey,
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: -1,
      width: 30,
      height: 30,
      borderRadius: 500,
    },
  });

  const scale = useSharedValue<number>(INITIAL_SCALE);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  useEffect(() => {
    scale.value = withSpring(SCALE);
  }, [scale]);

  return (
    <View style={styles.container}>
      <SharedElement id="info">
        <Animated.View style={[styles.infoCircle, scaleStyles]} />
      </SharedElement>
      <Scroll>
        <ModalIcon style={styles.back} modalScreen="Home">
          <BackIcon />
        </ModalIcon>
        <Text>Hello</Text>
      </Scroll>
    </View>
  );
}
