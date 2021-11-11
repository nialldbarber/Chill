import {useEffect, useState} from 'react';

import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

import useInterval from '~/hooks/useInterval';
import {Instruct} from '~/screens/Exercise/Exercise';
import {selectHasBegun} from '~/store/selectors/individual-exercise';
import {
  setBeginExercise,
  setStartCountdown,
} from '~/store/slices/individual-exercise';
import {ORIGINAL_SIZE, WIDTH} from '~/styles/theme';
import {formatAnimatedStr} from '~/utils/animatedText';
import {fmtInSTM, fmtOutSTM, secToMill} from '~/utils/time';

type AnimationT = {
  seconds: number;
  reset: () => void;
  instructions: Animated.SharedValue<Instruct>;
  innerCircleStyles: Animated.AnimateStyle<{
    width: number;
    height: number;
    borderRadius: number;
  }>;
  innerCircleTextStyles: Animated.AnimateStyle<{
    opacity: number;
  }>;
  animatedText: Animated.DerivedValue<string>;
};

export default function useGetAnimation(
  type: number | undefined,
  exercise: number[],
): AnimationT {
  const dispatch = useDispatch();
  const hasBegun = useSelector(selectHasBegun);
  const [seconds, setSeconds] = useState<number>(0);
  const innerCircle = useSharedValue<number>(ORIGINAL_SIZE);
  const instructions = useSharedValue<number>(0);
  const scale = useSharedValue<number>(0);
  const textVisibility = useSharedValue<number>(0);

  const innerCircleStyles = useAnimatedStyle(() => ({
    width: innerCircle.value,
    height: innerCircle.value,
    borderRadius: innerCircle.value / 2,
    transform: [{scale: scale.value}],
  }));

  const innerCircleTextStyles = useAnimatedStyle(() => ({
    opacity: textVisibility.value,
  }));

  const animatedText = useDerivedValue(() => {
    const text: string | number = instructions.value;
    const txt = formatAnimatedStr(text, instructions, type);
    return txt;
  }, [hasBegun]);

  const duration = 800;

  useEffect(() => {
    if (hasBegun) {
      // circle
      innerCircle.value = withRepeat(
        withSequence(
          withTiming(WIDTH, {duration: secToMill(exercise[0])}),
          withTiming(WIDTH, {duration: secToMill(exercise[1])}),
          withTiming(ORIGINAL_SIZE, {duration: secToMill(exercise[2])}),
          withTiming(ORIGINAL_SIZE, {duration: secToMill(exercise[3])}),
        ),
        -1,
        false,
      );
    }
  }, [hasBegun, exercise, innerCircle]);

  useEffect(() => {
    if (hasBegun) {
      if (type === 1) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(1, {duration: secToMill(exercise[0])}),
            withTiming(2, {duration: secToMill(exercise[1])}),
            withTiming(3, {duration: secToMill(exercise[2])}),
            withTiming(4, {duration: secToMill(exercise[3])}),
          ),
          -1,
          false,
        );
        // instructions
        textVisibility.value = withRepeat(
          withSequence(
            // 1
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[0]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
            // 2
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[1]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
            // 3
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[2]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
            // 4
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[3]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
          ),
          -1,
          false,
        );
      } else if (type === 2) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(1, {duration: secToMill(exercise[0])}),
            withTiming(2, {duration: secToMill(exercise[2])}),
            withTiming(3, {duration: secToMill(exercise[3])}),
          ),
          -1,
          false,
        );

        // instructions
        textVisibility.value = withRepeat(
          withSequence(
            // 1
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[0]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
            // 3
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[2]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
            // 4
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[3]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
          ),
          -1,
          false,
        );
      } else if (type === 3) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(1, {duration: secToMill(exercise[0])}),
            withTiming(2, {duration: secToMill(exercise[1])}),
            withTiming(3, {duration: secToMill(exercise[2])}),
          ),
          -1,
          false,
        );
        // instructions
        textVisibility.value = withRepeat(
          withSequence(
            // 1
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[0]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
            // 2
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[1]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
            // 3
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[2]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
          ),
          -1,
          false,
        );
      } else if (type === 4) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(1, {duration: secToMill(exercise[0])}),
            withTiming(2, {duration: secToMill(exercise[2])}),
          ),
          -1,
          false,
        );
        // instructions
        textVisibility.value = withRepeat(
          withSequence(
            // 1
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[0]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
            // 3
            withTiming(0, {duration}),
            withTiming(1, {
              duration: fmtInSTM(exercise[2]),
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(0, {duration}),
          ),
          -1,
          false,
        );
      }
    }
  }, [hasBegun, exercise, instructions, type, textVisibility]);

  useEffect(() => {
    scale.value = withDelay(450, withSpring(1));
  }, [scale]);

  useInterval(() => {
    if (hasBegun) {
      setSeconds((sec) => sec + 1), 1000, hasBegun, seconds;
    }
  });

  function reset(): void {
    setSeconds(0);
    dispatch(setBeginExercise(false));
    dispatch(setStartCountdown(false));
    innerCircle.value = withSpring(ORIGINAL_SIZE);
    instructions.value = 0;
    textVisibility.value = 0;
  }

  console.log({value: textVisibility.value});

  return {
    seconds,
    reset,
    instructions,
    innerCircleStyles,
    animatedText,
    innerCircleTextStyles,
  };
}
