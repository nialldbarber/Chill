import React from 'react';

import {render} from '@testing-library/react-native';

import {SignInScreen} from '~/screens/SignIn';

describe('<SignInScreen />', () => {
  it('renders', () => {
    const {getByText} = render(<SignInScreen />);
    expect(getByText('Welcome back!')).toBeTruthy();
  });
});
