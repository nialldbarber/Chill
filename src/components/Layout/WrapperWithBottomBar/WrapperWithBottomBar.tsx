import React from 'react';

import {StyleSheet, View, ViewStyle} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

type WrapperWithBottomBarProps = {
  style?: ViewStyle;
  children?: JSX.Element | JSX.Element[];
};

export default function WrapperWithBottomBar({
  children,
}: WrapperWithBottomBarProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: hp('12%'),
    },
  });

  return <View style={styles.container}>{children}</View>;
}
