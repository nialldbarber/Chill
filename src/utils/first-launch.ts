import AsyncStorage from '@react-native-async-storage/async-storage';

export const HAS_LAUNCHED = '@has_launched';

function setAppLaunched(): void {
  AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

export default async function checkIfFirstLaunch(): Promise<boolean> {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
