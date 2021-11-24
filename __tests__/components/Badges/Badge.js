import React from 'react';

import renderer from 'react-test-renderer';

import {Badges} from '../../../src/components/Badges/Badge';
import {feelingCategories} from '../../../src/constants/exercises';
import {renderWithWrapper} from '../../../src/utils/helpers';

describe('<Badge />', () => {
  it('should match snapshot', () => {
    const button = renderer
      .create(renderWithWrapper(<Badges data={feelingCategories} />))
      .toJSON();
    expect(button).toMatchSnapshot();
  });
});
