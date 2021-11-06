import React from 'react';

import {View} from 'react-native';

type AuthLoaderProps = {
  loading: boolean;
  children?: any;
};

export default function AuthLoader({loading, children}: AuthLoaderProps) {
  return loading ? <View>{children}</View> : null;
}
