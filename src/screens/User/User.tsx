import React, {ReactElement, useEffect, useState} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Text} from 'react-native';
import * as Keychain from 'react-native-keychain';

import Btn from '~/components/helpers/Button';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {goHome} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Authenticator'
>;

type UserT = {
  navigation: ProfileScreenNavigationProp;
};

export default function User({navigation}: UserT): ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkUser = async (): Promise<void> => {
      await Auth.currentAuthenticatedUser();
    };
    checkUser();
  }, [navigation]);

  const _onPress = async (): Promise<void> => {
    setLoading(true);
    try {
      await Auth.signOut();
      await Keychain.resetInternetCredentials('auth');
      goHome(navigation)();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Btn onPress={_onPress}>
      <Text>Sign Out</Text>
    </Btn>
  );
}
