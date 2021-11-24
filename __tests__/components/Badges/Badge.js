import React from 'react';

import renderer from 'react-test-renderer';

import {Badges} from '../../../src/components/Badges/Badge';
import {feelingCategories} from '../../../src/constants/exercises';
import {renderWithWrapper} from '../../helpers';

describe('<Badge />', () => {
  const button = renderer
    .create(renderWithWrapper(<Badges data={feelingCategories} />))
    .toJSON();
  expect(button).toMatchSnapshot();
});
