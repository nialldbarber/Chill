import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import RootNavigator from '~/components/Navigator/RootNavigator';
import {selectMode} from '~/store/selectors/dark-mode';
import {setMode} from '~/store/slices/dark-mode';
import getTheme from '~/styles/theme';

export default function Base() {
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  const mode = useSelector(selectMode);

  useEffect(() => {
    dispatch(setMode('light'));
  }, [dispatch, scheme, mode]);

  return (
    <NavigationContainer theme={getTheme(mode)}>
      <RootNavigator />
    </NavigationContainer>
  );
}
