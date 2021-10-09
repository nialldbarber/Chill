import React from 'react';

import BadgeInner from '~/components/Badges/BadgeInner';
import Scroll from '~/components/helpers/Scrollview';
import {feelings} from '~/constants/exercises';

type BadgesProps = {
  press: () => void;
};

export default function Badges({press}: BadgesProps) {
  return (
    <Scroll h>
      {feelings.map((item, i) => (
        <BadgeInner key={i} {...{i, item, press}} />
      ))}
    </Scroll>
  );
}
