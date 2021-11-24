// https://github.com/NewBieBR/typescript-react-native-starter/blob/master/jest.setup.js

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import 'isomorphic-fetch';
import nock from 'nock';
import 'react-native-gesture-handler/jestSetup';

// for persistor compatibility
// jest.useFakeTimers();

global.__reanimatedWorkletInit = () => {};

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn(),
    show: jest.fn(),
  };
});

nock.disableNetConnect();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
