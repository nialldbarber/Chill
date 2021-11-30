import React, {useState} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Text, View} from 'react-native';
import * as Keychain from 'react-native-keychain';

import {ActionButton} from '~/components/Button';
import Wrapper from '~/components/Layout/Wrapper';
import type {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {goHome} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Authenticator'
>;

type UserT = {
  navigation: ProfileScreenNavigationProp;
};

export default function Settings({navigation}: UserT) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onPress(): Promise<void> {
    setLoading(true);
    try {
      await Auth.signOut();
      await Keychain.resetInternetCredentials('auth');
      goHome(navigation)();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Wrapper>
      <View>
        <Text>Settings</Text>
      </View>
      <ActionButton text="Sign out" {...{onPress}} />
    </Wrapper>
  );
}
