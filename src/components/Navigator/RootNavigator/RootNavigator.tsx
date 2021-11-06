import React from 'react';

import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {AuthenticatorScreen} from '~/screens/Authenticator';
import ExerciseScreen from '~/screens/Exercise';
import HomeScreen from '~/screens/Home';
import InfoModalScreen from '~/screens/InfoModal';
import {SignUpScreen} from '~/screens/SignUp';

export type RootStackParamList = {
  Home: undefined;
  Exercise: undefined;
  Authenticator: undefined;
  InfoModal: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

const options = {headerShown: false};

export default function RootNavigator() {
  const {Navigator, Screen} =
    createSharedElementStackNavigator<RootStackParamList>();

  return (
    <Navigator
      initialRouteName="Authenticator"
      screenOptions={{gestureEnabled: false}}
    >
      <Screen name="Home" component={HomeScreen} {...{options}} />
      <Screen
        name="Authenticator"
        component={AuthenticatorScreen}
        {...{options}}
      />
      <Screen name="SignUp" component={SignUpScreen} {...{options}} />
      <Screen name="SignIn" component={SignUpScreen} {...{options}} />
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
