import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import {CardLayout} from '~/components/Layout/CardLayout';
import Wrapper from '~/components/Layout/Wrapper';

export default function Search() {
  const styles = StyleSheet.create({
    text: {
      fontSize: 100,
    },
  });

  return (
    <CardLayout>
      <View>
        <Text style={styles.text}>Search</Text>
        <Text style={styles.text}>Search</Text>
        <Text style={styles.text}>Search</Text>
        <Text style={styles.text}>Search</Text>
      </View>
    </CardLayout>
  );
}
