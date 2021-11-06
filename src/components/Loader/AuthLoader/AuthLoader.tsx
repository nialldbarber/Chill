import React from 'react';

import {Text} from 'react-native';

import Wrapper from '~/components/Layout/Wrapper';

type AuthLoaderProps = {
  loading: boolean;
  children?: any;
};

export default function AuthLoader({loading, children}: AuthLoaderProps) {
  return loading ? (
    <Wrapper>
      <Text>LOADING</Text>
    </Wrapper>
  ) : (
    children
  );
}
