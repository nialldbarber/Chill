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

import {HOLD, IN, OUT} from '~/constants/exercises';
import {ORIGINAL_SIZE, WIDTH} from '~/constants/theme';
import useInterval from '~/hooks/useInterval';
import {Instruct} from '~/screens/Exercise';
import {secToMill} from '~/utils/time';

type AnimationT = {
  startCountdown: boolean;
  seconds: number;
  beginExercise: boolean;
  handleBeginExercise: (cond: boolean) => void;
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
  exercise: number[]
): AnimationT {
  const [startCountdown, setStartCountdown] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [beginExercise, setBeginExercise] = useState<boolean>(false);
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
  }, [beginExercise]);

  useEffect(() => {
    if (beginExercise) {
      innerCircle.value = withRepeat(
        withSequence(
          // in breath
          withTiming(WIDTH, {duration: secToMill(exercise[0])}),
          // hold
          withTiming(WIDTH, {duration: secToMill(exercise[1])}),
          // out breath
          withTiming(ORIGINAL_SIZE, {duration: secToMill(exercise[2])}),
          // hold
          withTiming(ORIGINAL_SIZE, {duration: secToMill(exercise[3])})
        ),
        -1,
        false
      );
    }
  }, [beginExercise]);

  useEffect(() => {
    if (beginExercise) {
      if (type === 1) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(IN, {duration: secToMill(exercise[0])}),
            withTiming(HOLD, {duration: secToMill(exercise[1])}),
            withTiming(OUT, {duration: secToMill(exercise[2])}),
            withTiming(HOLD, {duration: secToMill(exercise[3])})
          ),
          -1,
          false
        );
      } else if (type === 2) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(IN, {duration: secToMill(exercise[0])}),
            withTiming(OUT, {duration: secToMill(exercise[2])}),
            withTiming(HOLD, {duration: secToMill(exercise[3])})
          ),
          -1,
          false
        );
      } else if (type === 3) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(IN, {duration: secToMill(exercise[0])}),
            withTiming(HOLD, {duration: secToMill(exercise[1])}),
            withTiming(OUT, {duration: secToMill(exercise[2])})
          ),
          -1,
          false
        );
      } else if (type === 4) {
        instructions.value = withRepeat(
          withSequence(
            withTiming(IN, {duration: secToMill(exercise[0])}),
            withTiming(OUT, {duration: secToMill(exercise[2])})
          ),
          -1,
          false
        );
      }
    }
  }, [beginExercise]);

  useEffect(() => {
    scale.value = withDelay(450, withSpring(1));
  }, []);

  useInterval(() => {
    if (beginExercise) {
      setSeconds((sec) => sec + 1), 1000, beginExercise, seconds;
    }
  });

  function handleBeginExercise(cond: boolean): void {
    setStartCountdown(true);
    if (cond) {
      setTimeout(() => {
        setBeginExercise(cond);
      }, 4000);
    } else {
      setBeginExercise(cond);
    }
  }

  function reset(): void {
    setSeconds(0);
    handleBeginExercise(false);
    setStartCountdown(false);
    innerCircle.value = withSpring(ORIGINAL_SIZE);
    instructions.value = '';
  }

  return {
    startCountdown,
    seconds,
    beginExercise,
    handleBeginExercise,
    reset,
    instructions,
    innerCircleStyles,
    animatedText,
  };
}
