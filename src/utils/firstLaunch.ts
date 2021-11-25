import AsyncStorage from '@react-native-async-storage/async-storage';

export const HAS_LAUNCHED = '@has_launched';

/**
 * Sets the has launched flag to true
 */
function setAppLaunched(): void {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

/**
 * Checks if the app has launched before
 *
 * @return {Promise<boolean>} return value of if the app has launched before
 */
export default async function checkIfFirstLaunch(): Promise<boolean> {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}
