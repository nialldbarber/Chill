import React from 'react';

import renderer from 'react-test-renderer';

import {Badges} from '../../../src/components/Badges/Badge';
import {feelingCategories} from '../../../src/constants/exercises';

describe('<Badge />', () => {
  const button = renderer.create(<Badges data={feelingCategories} />).toJSON();
  expect(button).toMatchSnapshot();
});
