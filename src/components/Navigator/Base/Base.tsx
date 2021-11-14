import React, {useEffect} from 'react';

import Amplify from '@aws-amplify/core';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {useDispatch, useSelector} from 'react-redux';

import awsconfig from '../../../aws-exports';
import {RootNavigator} from '~/components/Navigator/RootNavigator';
import {selectMode} from '~/store/selectors/dark-mode';
import {setMode} from '~/store/slices/dark-mode';
import getTheme from '~/styles/theme';

const MEMORY_KEY_PREFIX = '@ChillAppStorage:';
let dataMemory: any = {};

class ChillAppStorage {
  static syncPromise = null;

  static setItem(key: string, value: string): boolean {
    Keychain.setGenericPassword(MEMORY_KEY_PREFIX + key, value);
    dataMemory[key] = value;
    return dataMemory[key];
  }

  static getItem(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(dataMemory, key)
      ? dataMemory[key]
      : undefined;
  }

  static removeItem(key: string): boolean {
    Keychain.resetGenericPassword();
    return delete dataMemory[key];
  }

  static clear(): object {
    dataMemory = {};
    return dataMemory;
  }
}

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: false,
  },
  storage: ChillAppStorage,
});

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
