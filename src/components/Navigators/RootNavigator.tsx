import React, {useState, useEffect} from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import checkIfFirstLaunch from '~/utils/first-launch';
import ExerciseScreen from '~/screens/Exercise';
import HomeScreen from '~/screens/Home';
import OnboardingScreen from '~/screens/Onboarding';

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
    checkIfFirstLaunch().then((isFirstLaunch) => {
      setIsFirstLaunch(isFirstLaunch);
    });
  }, []);

  if (isFirstLaunch === null) return null;

  return (
    <Stack.Navigator initialRouteName={isFirstLaunch ? 'Home' : 'Onboarding'}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
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
