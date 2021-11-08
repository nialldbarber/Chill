import Animated from 'react-native-reanimated';

import {Instruct} from '~/screens/Exercise/Exercise';

type N = number;
type S = string;

export function getAnimatedTextFormatted(str: any): S {
  'worklet';
  let formattedStr = str?.value;
  formattedStr = formattedStr?.toString();
  formattedStr = str?.replace(/NaN/g, '');
  return formattedStr;
}

export const formatAnimatedStr = (
  str: S | N,
  instructions: Animated.SharedValue<Instruct>,
  type: N | undefined,
): S => {
  'worklet';

  let text: S | N = str;

  if (type === 1) {
    if (instructions.value < 1) {
      text = 'breathe in';
    } else if (instructions.value > 1 && instructions.value < 2) {
      text = 'hold';
    } else if (instructions.value > 2 && instructions.value < 3) {
      text = 'breathe out';
    } else if (instructions.value > 3 && instructions.value < 4) {
      text = 'hold';
    }
  } else if (type === 2) {
    if (instructions.value < 1) {
      text = 'breathe in';
    } else if (instructions.value > 1 && instructions.value < 2) {
      text = 'breathe out';
    } else if (instructions.value > 2 && instructions.value < 3) {
      text = 'hold';
    }
  } else if (type === 3) {
    if (instructions.value < 1) {
      text = 'breathe in';
    } else if (instructions.value > 1 && instructions.value < 2) {
      text = 'hold';
    } else if (instructions.value > 2 && instructions.value < 3) {
      text = 'breathe out';
    }
  } else if (type === 4) {
    if (instructions.value < 1) {
      text = 'breathe in';
    } else if (instructions.value > 1 && instructions.value < 2) {
      text = 'breathe out';
    }
  }

  return text.toString().replace(/NaN/g, '');
};
