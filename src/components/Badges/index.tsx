import React from 'react';
import {ScrollView} from 'react-native';
import BadgeInner from './BadgeInner';
import {feelings} from '../../constants/exercises';

export default function Badges() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {feelings.map((item, i) => (
        <BadgeInner key={i} {...{i, item}} />
      ))}
    </ScrollView>
  );
}
