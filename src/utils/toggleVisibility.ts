import Animated, {withTiming} from 'react-native-reanimated';

export function toggleVisibility(
  sharedValue: Animated.SharedValue<number | string | null>,
  show: boolean = true,
  timeout: number,
): void {
  if (show) {
    sharedValue.value = withTiming(0);
    setTimeout(() => {
      sharedValue.value = withTiming(1);
    }, timeout);
  } else {
    sharedValue.value = withTiming(1);
    setTimeout(() => {
      sharedValue.value = withTiming(0);
    }, timeout);
  }
}
