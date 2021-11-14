import React from 'react';

import {StyleSheet, Text, TextStyle} from 'react-native';

type PProps = {
  style?: TextStyle;
  children?: string;
};

export default function P({style, children}: PProps) {
  const styles = StyleSheet.create({
    base: {
      fontFamily: 'Inter-Regular',
    },
  });

  return <Text style={[styles.base, style]}>{children}</Text>;
}
