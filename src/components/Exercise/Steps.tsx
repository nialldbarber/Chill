import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {COLORS} from '~/constants/theme';

type StepsProps = {
  exercise: number[];
  theme: string;
};

export default function Steps({exercise, theme}: StepsProps) {
  const stringMap = exercise.join('-');

  return (
    <View style={styles.exercise}>
      <Text
        style={{
          ...styles.exerciseNode,
          color: theme === 'yellow' ? COLORS.black : COLORS[theme],
        }}
      >
        {stringMap}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  exercise: {
    position: 'absolute',
    transform: [{rotate: '-90deg'}],
    top: hp('50%'),
    right: wp('-12%'),
  },
  exerciseNode: {
    fontSize: wp('8%'),
    fontWeight: '500',
    letterSpacing: 3,
  },
});
