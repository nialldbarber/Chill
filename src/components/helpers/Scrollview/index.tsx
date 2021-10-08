import React, {ReactChild} from 'react';
import {ScrollView} from 'react-native';

type ScrollProps = {
  h: boolean;
  children: ReactChild | JSX.Element[];
};

export default function Scroll({h, children}: ScrollProps) {
  return (
    <ScrollView horizontal={h} showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
