import React, {useEffect, useState} from 'react';

import {useColorScheme} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {useDispatch} from 'react-redux';

import ExerciseScreen from '~/screens/Exercise';
import HomeScreen from '~/screens/Home';
import InfoModalScreen from '~/screens/InfoModal';
import OnboardingScreen from '~/screens/Onboarding';
import {setMode} from '~/store/slices/dark-mode';
import checkIfFirstLaunch from '~/utils/firstLaunch';

export type RootStackParamList = {
  Home: undefined;
  Exercise: undefined;
  Onboarding: undefined;
  InfoModal: undefined;
};

const options = {headerShown: false};

export default function RootNavigator() {
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const {Navigator, Screen} =
    createSharedElementStackNavigator<RootStackParamList>();

  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    dispatch(setMode(scheme || ''));
  }, [dispatch, scheme]);

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
