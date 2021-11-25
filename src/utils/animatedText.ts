import Animated from 'react-native-reanimated';

import type {Instruct} from '~/screens/Exercise/Exercise';

export function getAnimatedTextFormatted(str: any): string {
  'worklet';
  let formattedStr = str?.value;
  formattedStr = formattedStr?.toString();
  formattedStr = str?.replace(/NaN/g, '');
  return formattedStr;
}

// TODO: 👇 This is gross, find something better!
export function formatAnimatedStr(
  str: number,
  instructions: Animated.SharedValue<Instruct>,
  type: number | undefined,
): string {
  'worklet';

  let text: string = str.toString();

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

  return text;
}
