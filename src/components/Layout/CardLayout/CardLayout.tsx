import React from 'react';

import {StyleSheet, View, ViewStyle} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Scroll from '~/components/helpers/Scrollview';
import {fixedColors} from '~/styles/theme';

type CardLayoutProps = {
  style?: ViewStyle;
  children?: JSX.Element | JSX.Element[];
};

export default function CardLayout({style, children}: CardLayoutProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: fixedColors.blue,
    },
    card: {
      backgroundColor: fixedColors.white,
      width: wp('100%'),
      bottom: 0,
      marginTop: hp('26%'),
      borderTopRightRadius: wp('15%'),
      borderTopLeftRadius: wp('15%'),
      paddingHorizontal: wp('7%'),
      paddingVertical: wp('5%'),
    },
  });

  return (
    <Scroll>
      <View style={[styles.container, style]}>
        <View style={styles.card}>
          <View>{children}</View>
        </View>
      </View>
    </Scroll>
  );
}
