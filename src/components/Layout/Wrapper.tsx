import React from 'react';

import {StyleSheet, View} from 'react-native';

type WrapperProps = {
  style: any;
  children: JSX.Element | JSX.Element[];
};

export default function Wrapper({style, children}: WrapperProps) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return <View style={[styles.container, style]}>{children}</View>;
}
