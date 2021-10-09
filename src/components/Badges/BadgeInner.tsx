import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {filterBySelectedBadge} from '../../store/slices/exercises';
import Btn from '~/components/helpers/Button';
import {fixedColors} from '~/styles/theme';
import {feelings} from '~/constants/exercises';

type BadgeInnerProps = {
  i: number;
  item: string;
  press: () => void;
};

export default function BadgeInner({i, item, press}: BadgeInnerProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    badgeContainer: {
      marginTop: hp('2%'),
      marginBottom: hp('4%'),
    },
    badge: {
      backgroundColor: fixedColors.primaryFaded,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginRight: 10,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    badgeText: {
      color: colors.primary,
      fontWeight: '800',
      fontSize: wp('4%'),
    },
  });

  const dispatch = useDispatch();
  const scale = useSharedValue(1);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  function handleFilter(): void {
    setTimeout(() => {
      dispatch(filterBySelectedBadge(feelings[i]));
    }, 200);
  }

  return (
    <Btn
      key={i}
      style={styles.badgeContainer}
      onPress={() => {
        handleFilter();
        press();
      }}
      onPressIn={() => (scale.value = withSpring(1.05))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View
        style={[
          styles.badge,
          {marginLeft: i === 0 ? wp('5%') : 0},
          scaleStyles,
        ]}
      >
        <Text style={styles.badgeText}>{item}</Text>
      </Animated.View>
    </Btn>
  );
}
