import React from 'react';

import BadgeInner from '~/components/Badges/BadgeInner';
import Scroll from '~/components/helpers/Scrollview';

type BadgesProps = {
  data?: any;
  press?: () => void;
};

export default function Badges({data, press}: BadgesProps) {
  return (
    <Scroll h>
      {data.map((item: number, index: number) => (
        <BadgeInner key={index} {...{index, item, press}} />
      ))}
    </Scroll>
  );
}
