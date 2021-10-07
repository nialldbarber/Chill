import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export function impactAsync(style: string): void {
  switch (style) {
    case 'light':
      ReactNativeHapticFeedback.trigger('impactLight', options);
      break;
    case 'medium':
      ReactNativeHapticFeedback.trigger('impactLight', options);
      break;
    case 'heavy':
      ReactNativeHapticFeedback.trigger('impactLight', options);
      break;
    default:
      ReactNativeHapticFeedback.trigger('impactLight', options);
      break;
  }
}
