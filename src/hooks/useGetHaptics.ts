import {useEffect} from 'react';

import Animated from 'react-native-reanimated';

import type {Instruct} from '~/screens/Exercise/Exercise';
import {haptics} from '~/utils/haptics';

export default function useGetHaptics(
  animatedText: Animated.DerivedValue<string>,
  instructions: Animated.SharedValue<Instruct>,
) {
  useEffect(() => {
    const str: any = animatedText?.value;

    if (str === 'breathe in') {
      haptics.impactLight();
      setTimeout(() => {
        haptics.impactLight();
      }, 50);
    } else if (str === 'breathe out') {
      haptics.impactMedium();
      for (let i = 0; i < 100; i += 10) {
        setTimeout(() => {
          haptics.impactMedium();
        }, i);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructions.value]);
}
