import React from 'react';

import renderer from 'react-test-renderer';

import {Badges} from '~/components/Badges/Badge';
import {feelingCategories} from '~/constants/exercises';
import {renderWithWrapper} from '~/utils/helpers';

describe('<Badge />', () => {
  it('should match snapshot', () => {
    const badge = renderer
      .create(renderWithWrapper(<Badges data={feelingCategories} />))
      .toJSON();
    expect(badge).toMatchSnapshot();
  });
});
