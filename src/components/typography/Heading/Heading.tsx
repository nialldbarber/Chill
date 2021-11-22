import React from 'react';

import {StyleSheet, Text, TextStyle} from 'react-native';

type HProps = {
  style?: TextStyle;
  children?: string;
};

export default function H({style, children}: HProps) {
  const styles = StyleSheet.create({
    base: {
      fontFamily: 'Poppins-regular',
    },
  });

  return <Text style={[styles.base, style]}>{children}</Text>;
}
