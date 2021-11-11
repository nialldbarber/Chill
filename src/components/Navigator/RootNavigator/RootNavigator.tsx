import React, {useEffect, useState} from 'react';

import {Auth, Hub} from 'aws-amplify';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {TabNavigator} from '~/components/Navigator/TabNavigator';
import {AuthenticatorScreen} from '~/screens/Authenticator';
import {ConfirmSignUpScreen} from '~/screens/ConfirmSignUp';
import {ExerciseScreen} from '~/screens/Exercise';
import {ForgotPasswordScreen} from '~/screens/ForgotPassword';
import {ForgotPasswordSubmitScreen} from '~/screens/ForgotPasswordSubmit';
import {InfoScreen} from '~/screens/Info';
import {SignInScreen} from '~/screens/SignIn';
import {SignUpScreen} from '~/screens/SignUp';

export type RootStackParamList = {
  Home: undefined;
  Exercise: undefined;
  Authenticator: undefined;
  InfoModal: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ConfirmSignUp: {email: string; password: string};
  ForgotPassword: {email: string};
  ForgotPasswordSubmit: {email: string};
};

const options = {headerShown: false};

export default function RootNavigator() {
  const [u, setUser] = useState(null);
  const {Navigator, Screen} =
    createSharedElementStackNavigator<RootStackParamList>();

  // useEffect(() => {
  //   const updateUser = async () => {
  //     try {
  //       const user = await Auth.currentAuthenticatedUser();
  //       setUser(user);
  //     } catch {
  //       setUser(null);
  //     }
  //   };
  //   Hub.listen('auth', updateUser); // listen for login/signup events
  //   updateUser(); // check manually the first time because we won't get a Hub event
  //   return () => Hub.remove('auth', updateUser); // cleanup
  // }, []);
  // console.log({u});

  return (
    <Navigator
      initialRouteName="Authenticator"
      screenOptions={{gestureEnabled: false}}
    >
      <Screen name="Home" component={TabNavigator} {...{options}} />
      <Screen
        name="Authenticator"
        component={AuthenticatorScreen}
        {...{options}}
      />
      <Screen name="SignUp" component={SignUpScreen} {...{options}} />
      <Screen name="SignIn" component={SignInScreen} {...{options}} />
      <Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        {...{options}}
      />
      <Screen
        name="ForgotPasswordSubmit"
        component={ForgotPasswordSubmitScreen}
        {...{options}}
      />
      <Screen
        name="ConfirmSignUp"
        component={ConfirmSignUpScreen}
        {...{options}}
      />
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
        component={InfoScreen}
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
