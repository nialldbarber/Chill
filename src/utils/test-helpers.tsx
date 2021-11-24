import React from 'react';

import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';

import {store} from '~/store/index';

export function renderWithWrapper(children) {
  return <Provider store={store}>{children}</Provider>;
}

export function matchSnapshot(component) {
  const shallow = render(renderWithWrapper(component)).toJSON();
  expect(shallow).toMatchSnapshot();
}
