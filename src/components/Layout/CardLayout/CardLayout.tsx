import React from 'react';

import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Scroll from '~/components/helpers/Scrollview';
import {fixedColors} from '~/styles/theme';

type CardLayoutProps = {
  title?: string | JSX.Element | JSX.Element[];
  style?: ViewStyle;
  children?: JSX.Element | JSX.Element[];
};

const windowWidth = Dimensions.get('window').width;

export default function CardLayout({title, style, children}: CardLayoutProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: fixedColors.lightBlue,
    },
    title: {
      display: 'flex',
      alignSelf: 'center',
      height: hp('26%'),
      width: windowWidth,
      justifyContent: 'flex-end',
      marginBottom: hp('-26%'),
      paddingHorizontal: wp('7%'),
    },
    card: {
      backgroundColor: fixedColors.white,
      width: windowWidth,
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
        {title ? <View style={styles.title}>{title}</View> : null}
        <View style={styles.card}>
          <View>{children ?? null}</View>
        </View>
      </View>
    </Scroll>
  );
}
