import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {hide} from 'react-native-bootsplash';
import {Provider} from 'react-redux';

import RootNavigator from '~/components/Navigator/RootNavigator';
import {store} from '~/store/index';
import getTheme from '~/styles/theme';

export default function App() {
  const scheme = useColorScheme();

  useEffect(() => {
    hide({fade: true});
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={getTheme(scheme || '')}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
