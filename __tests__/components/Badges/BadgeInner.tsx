import React from 'react';

import {render} from '@testing-library/react-native';

import {BadgeInner} from '~/components/Badges/BadgeInner';
import {matchSnapshot, renderWithWrapper} from '~/utils/test-helpers';

describe('<BadgeInner />', () => {
  it('should match snapshot', () => {
    matchSnapshot(<BadgeInner index={1} item={1} />);
  });

  it('should render 1 when provided', () => {
    const {getByText} = render(
      renderWithWrapper(<BadgeInner index={1} item={1} />),
    );
    const element = getByText('1');
    expect(element).toBeTruthy();
  });
});
