import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeScreen} from '~/screens/Home';
import {SearchScreen} from '~/screens/Search';
import {SettingsScreen} from '~/screens/Settings';

export type TabStackParamList = {
  HomeScreen: undefined;
  Settings: undefined;
  Search: undefined;
};

const options = {headerShown: false};

const Tab = createBottomTabNavigator<TabStackParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} {...{options}} />
      <Tab.Screen name="Search" component={SearchScreen} {...{options}} />
      <Tab.Screen name="Settings" component={SettingsScreen} {...{options}} />
    </Tab.Navigator>
  );
}
