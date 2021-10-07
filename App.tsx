import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import {store} from './src/store';
import RootNavigator from './src/components/Navigators/RootNavigator';
import getTheme from './src/styles/theme';

export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={getTheme(scheme)}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
