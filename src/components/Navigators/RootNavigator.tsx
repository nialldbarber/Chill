import React, {useEffect, useState} from 'react';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import ExerciseScreen from '~/screens/Exercise';
import HomeScreen from '~/screens/Home';
import OnboardingScreen from '~/screens/Onboarding';
import checkIfFirstLaunch from '~/utils/first-launch';

export type RootStackParamList = {
  Home: undefined;
  Exercise: any;
  Onboarding: undefined;
};

const options = {headerShown: false};

export default function RootNavigator() {
  const Stack = createSharedElementStackNavigator<RootStackParamList>();

  const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);

  useEffect(() => {
    checkIfFirstLaunch().then((firstLaunch) => {
      setIsFirstLaunch(firstLaunch);
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? 'Home' : 'Onboarding'}
      screenOptions={{gestureEnabled: false}}
    >
      <Stack.Screen name="Home" component={HomeScreen} {...{options}} />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        {...{options}}
      />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{headerShown: false}}
        sharedElements={(route, otherRoute, showing) => {
          if (otherRoute.name === 'Home' && showing) {
            const {exerciseName, id} = route.params;
            return [exerciseName, `${id}`];
          }
        }}
      />
    </Stack.Navigator>
  );
}
