import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setStoredData(value: string): Promise<void> {
  try {
    await AsyncStorage.setItem('@first_name', value);
  } catch (err) {
    console.log(err);
  }
}

export async function getStoredData(): Promise<{
  name: string;
}> {
  try {
    let name: string;
    const value = await AsyncStorage.getItem('@first_name');
    if (value !== null) {
      name = value;
    } else {
      name = '';
    }
    return {name};
  } catch (err) {
    throw err;
  }
}
