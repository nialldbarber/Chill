import React from 'react';

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
import {useDispatch} from 'react-redux';

import Btn from '~/components/helpers/Button';
import {FEELING_MAPPED_KEY, feelings} from '~/constants/exercises';
import {setFilterBySelectedBadge} from '~/store/slices/exercises';
import {DEEP_BACKGROUND, FADED_BACKGROUND} from '~/styles/theme';

type BadgeInnerProps = {
  index: number;
  item: number;
  press?: () => void;
};

export default function BadgeInner({index, item, press}: BadgeInnerProps) {
  const styles = StyleSheet.create({
    badgeContainer: {
      marginTop: hp('2%'),
      marginBottom: hp('4%'),
    },
    badge: {
      backgroundColor: FADED_BACKGROUND[FEELING_MAPPED_KEY[item]],
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginRight: 10,
      borderColor: DEEP_BACKGROUND[FEELING_MAPPED_KEY[item]],
      borderWidth: 1,
    },
    badgeText: {
      color: DEEP_BACKGROUND[FEELING_MAPPED_KEY[item]],
      fontWeight: '800',
      fontSize: wp('4%'),
    },
  });

  const dispatch = useDispatch();
  const scale = useSharedValue<number>(1);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  function handleFilter(): void {
    setTimeout(() => {
      dispatch(setFilterBySelectedBadge(feelings[index]));
    }, 200);
  }

  return (
    <Btn
      style={styles.badgeContainer}
      onPress={() => {
        handleFilter();
        press && press();
      }}
      onPressIn={() => (scale.value = withSpring(1.05))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View
        style={[
          styles.badge,
          {marginLeft: index === 0 ? wp('5%') : 0},
          scaleStyles,
        ]}
      >
        <Text style={styles.badgeText}>{item}</Text>
      </Animated.View>
    </Btn>
  );
}
