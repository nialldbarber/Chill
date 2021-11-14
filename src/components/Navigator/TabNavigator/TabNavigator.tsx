import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {Image, Text, View} from 'react-native';

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
  const {colors} = useTheme();

  const tabBarStyle = {
    position: 'absolute',
    left: 20,
    bottom: 25,
    right: 20,
    elevation: 0,
    height: 90,
    borderColor: colors.background,
    backgroundColor: colors.background,
    borderRadius: 15,
    shadowColor: colors.border,
    borderTopColor: colors.background,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  };

  return (
    <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{tabBarStyle}}>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          ...options,
          tabBarIcon: ({focused}) => (
            <View>
              {/* <Image /> */}
              <Text>Search</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="HomeScreen" component={HomeScreen} {...{options}} />
      <Tab.Screen name="Settings" component={SettingsScreen} {...{options}} />
    </Tab.Navigator>
  );
}
