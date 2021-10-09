import React from 'react';

import BadgeInner from '~/components/Badges/BadgeInner';
import Scroll from '~/components/helpers/Scrollview';
import {feelings} from '~/constants/exercises';

export default function Badges({press}: {press: () => void}) {
  return (
    <Scroll h>
      {feelings.map((item, i) => (
        <BadgeInner key={i} {...{i, item, press}} />
      ))}
    </Scroll>
  );
}
