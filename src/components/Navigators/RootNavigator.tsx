import * as React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomeScreen from '../../screens/Home';
import ExerciseScreen from '../../screens/Exercise';

export type RootStackParamList = {
  Home: undefined;
  Exercise: any;
};

const options = {headerShown: false};

export default function RootNavigator() {
  const Stack = createSharedElementStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} {...{options}} />
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
