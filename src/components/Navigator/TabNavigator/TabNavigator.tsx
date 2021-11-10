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
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          bottom: 25,
          right: 20,
          elevation: 0,
          height: 90,
          borderColor: '#fff',
          backgroundColor: '#fff',
          borderRadius: 15,
          shadowColor: '#1a1a1a',
          shadowOffset: {
            width: 1,
            height: 3,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
        },
      }}
    >
      <Tab.Screen name="Search" component={SearchScreen} {...{options}} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} {...{options}} />
      <Tab.Screen name="Settings" component={SettingsScreen} {...{options}} />
    </Tab.Navigator>
  );
}
