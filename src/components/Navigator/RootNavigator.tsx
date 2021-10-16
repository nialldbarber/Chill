import React, {useEffect, useState} from 'react';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import ExerciseScreen from '~/screens/Exercise';
import HomeScreen from '~/screens/Home';
import InfoModalScreen from '~/screens/InfoModal';
import OnboardingScreen from '~/screens/Onboarding';
import checkIfFirstLaunch from '~/utils/firstLaunch';

export type RootStackParamList = {
  Home: undefined;
  Exercise: undefined;
  Onboarding: undefined;
  InfoModal: undefined;
};

const options = {headerShown: false};

export default function RootNavigator() {
  const {Navigator, Screen} =
    createSharedElementStackNavigator<RootStackParamList>();

  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    checkIfFirstLaunch().then((firstLaunch) => {
      setIsFirstLaunch(firstLaunch);
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <Navigator
      initialRouteName={isFirstLaunch ? 'Home' : 'Onboarding'}
      screenOptions={{gestureEnabled: false}}
    >
      <Screen name="Home" component={HomeScreen} {...{options}} />
      <Screen name="Onboarding" component={OnboardingScreen} {...{options}} />
      <Screen
        name="Exercise"
        component={ExerciseScreen}
        {...{options}}
        sharedElements={(route, otherRoute, showing) => {
          if (otherRoute.name === 'Home' && showing) {
            const {exerciseName, id} = route.params;
            return [exerciseName, `${id}`];
          }
        }}
      />
      <Screen
        name="InfoModal"
        component={InfoModalScreen}
        {...{options}}
        sharedElements={(route, showing) => {
          if (showing) {
            const {page} = route.params;
            return [page];
          }
        }}
      />
    </Navigator>
  );
}
