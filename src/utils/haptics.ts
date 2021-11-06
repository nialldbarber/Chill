import keys from 'lodash.keys';
import map from 'lodash.map';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import reduceArrayToObject from '~/utils/reduceArrayToObject';

type Haptics = {
  impactHeavy: string;
  impactLight: string;
  impactMedium: string;
  keyboardPress: string;
  notificationError: string;
  notificationSuccess: string;
  notificationWarning: string;
  selection: string;
};

export const HapticFeedbackTypes: Haptics = {
  impactHeavy: 'impactHeavy',
  impactLight: 'impactLight',
  impactMedium: 'impactMedium',
  keyboardPress: 'keyboardPress',
  notificationError: 'notificationError',
  notificationSuccess: 'notificationSuccess',
  notificationWarning: 'notificationWarning',
  selection: 'selection',
};

export const hapticToTrigger = (haptic) => {
  return {
    [haptic]: () => ReactNativeHapticFeedback.trigger(haptic),
  };
};

export const haptics = reduceArrayToObject(
  map(keys(HapticFeedbackTypes), hapticToTrigger),
);
