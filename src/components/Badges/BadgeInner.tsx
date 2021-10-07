import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {feelings} from '../../constants/exercises';
import {useDispatch} from 'react-redux';
import {filterBySelectedBadge} from '../../store/slices/exercises';

type BadgeInnerProps = {
  i: number;
  item: string;
};

export default function BadgeInner({i, item}: BadgeInnerProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    badgeContainer: {
      marginTop: hp('2%'),
      marginBottom: hp('4%'),
    },
    badge: {
      backgroundColor: colors.primaryFaded,
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

  return (
    <TouchableOpacity
      key={i}
      activeOpacity={1}
      onPress={() => {
        dispatch(filterBySelectedBadge(feelings[i]));
      }}
      onPressIn={() => (scale.value = withSpring(1.05))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={styles.badgeContainer}
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
    </TouchableOpacity>
  );
}
