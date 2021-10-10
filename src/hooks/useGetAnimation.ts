import {useEffect, useState} from 'react';

import Animated, {
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

import {HOLD, IN, OUT} from '~/constants/exercises';
import {ORIGINAL_SIZE, WIDTH} from '~/constants/theme';
import useInterval from '~/hooks/useInterval';
import {Instruct} from '~/screens/Exercise';
import {selectHasBegun} from '~/store/selectors/individual-exercise';
import {
  handleBeginExercise,
  handleStartCountdown,
} from '~/store/slices/individual-exercise';
import {secToMill} from '~/utils/time';

type AnimationT = {
  seconds: number;
  reset: () => void;
  instructions: Animated.SharedValue<Instruct>;
  innerCircleStyles: Animated.AnimateStyle<{
    width: number;
    height: number;
    borderRadius: number;
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
  const instructions = useSharedValue<Instruct>('');
  const scale = useSharedValue<number>(0);

  const innerCircleStyles = useAnimatedStyle(() => ({
    width: innerCircle.value,
    height: innerCircle.value,
    borderRadius: innerCircle.value / 2,
    transform: [{scale: scale.value}],
  }));

  const animatedText = useDerivedValue(() => {
    let str: Instruct = instructions.value;
    str = str.toString().replace(/NaN/g, '');
    return str;
  }, [hasBegun]);

  useEffect(() => {
    if (hasBegun) {
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
            withTiming(IN, {duration: secToMill(exercise[0])}),
            withTiming(HOLD, {duration: secToMill(exercise[1])}),
            withTiming(OUT, {duration: secToMill(exercise[2])}),
            withTiming(HOLD, {duration: secToMill(exercise[3])}),
          ),
          -1,
          false,
        );
      } else if (type === 2) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(IN, {duration: secToMill(exercise[0])}),
            withTiming(OUT, {duration: secToMill(exercise[2])}),
            withTiming(HOLD, {duration: secToMill(exercise[3])}),
          ),
          -1,
          false,
        );
      } else if (type === 3) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(IN, {duration: secToMill(exercise[0])}),
            withTiming(HOLD, {duration: secToMill(exercise[1])}),
            withTiming(OUT, {duration: secToMill(exercise[2])}),
          ),
          -1,
          false,
        );
      } else if (type === 4) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(IN, {duration: secToMill(exercise[0])}),
            withTiming(OUT, {duration: secToMill(exercise[2])}),
          ),
          -1,
          false,
        );
      }
    }
  }, [hasBegun, exercise, instructions, type]);

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
    dispatch(handleBeginExercise(false));
    dispatch(handleStartCountdown(false));
    innerCircle.value = withSpring(ORIGINAL_SIZE);
    instructions.value = '';
  }

  return {
    seconds,
    reset,
    instructions,
    innerCircleStyles,
    animatedText,
  };
}
