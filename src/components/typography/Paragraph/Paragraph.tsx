import React from 'react';

import {StyleSheet, Text, TextStyle} from 'react-native';

type PProps = {
  style?: TextStyle;
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  children?: string;
};

export default function P({style, weight = 'regular', children}: PProps) {
  const styles = StyleSheet.create({
    base: {
      fontFamily: `Poppins-${weight}`,
    },
  });

  return <Text style={[styles.base, style]}>{children}</Text>;
}
