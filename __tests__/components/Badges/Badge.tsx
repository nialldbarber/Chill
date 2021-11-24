import React from 'react';

import {render} from '@testing-library/react-native';

import {Badges} from '~/components/Badges/Badge';
import {feelingCategories} from '~/constants/exercises';
import {matchSnapshot} from '~/utils/test-helpers';

describe('<Badge />', () => {
  it('should match snapshot', () => {
    matchSnapshot(<Badges data={feelingCategories} />);
  });
});

// renders null if no data
