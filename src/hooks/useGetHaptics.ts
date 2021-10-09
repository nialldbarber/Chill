import {useEffect} from 'react';

import Animated from 'react-native-reanimated';

import {Instruct} from '~/screens/Exercise';
import {getAnimatedTextFormatted} from '~/utils/animated-text';
import {impactAsync} from '~/utils/haptics';

export default function useGetHaptics(
  instructions: Animated.SharedValue<Instruct>,
) {
  useEffect(() => {
    const str = getAnimatedTextFormatted(instructions.value);

    if (str === 'In') {
      impactAsync('light');
      setTimeout(() => {
        impactAsync('light');
      }, 50);
    } else if (str === 'Out') {
      impactAsync('medium');
      for (let i = 0; i < 100; i += 10) {
        setTimeout(() => {
          impactAsync('medium');
        }, i);
      }
    }
  }, [instructions.value]);
}
