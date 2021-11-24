import React from 'react';

import {BadgeInner} from '~/components/Badges/BadgeInner';
import Scroll from '~/components/helpers/Scrollview';

type BadgesProps = {
  data?: any;
  press?: () => void;
};

type T = number;

export default function Badges({data, press}: BadgesProps) {
  return (
    <Scroll h>
      {data.map((item: T, index: T) => (
        <BadgeInner
          key={index}
          index={index}
          item={item}
          press={() => press && press()}
        />
      ))}
    </Scroll>
  );
}
