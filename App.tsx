import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';

import RootNavigator from '~/components/Navigators/RootNavigator';
import {store} from '~/store/index';
import getTheme from '~/styles/theme';

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
