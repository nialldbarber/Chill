import React, {useEffect, useState} from 'react';

import {Auth} from 'aws-amplify';
import {Text} from 'react-native';
import * as Keychain from 'react-native-keychain';

import Btn from '~/components/helpers/Button';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import {onScreen} from '~/utils/navigation';

export default function Authenticator({navigation}) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    (async function (): Promise<void> {
      try {
        const credentials = await Keychain.getInternetCredentials('auth');

        if (credentials) {
          const {username, password} = credentials;
          const user = await Auth.signIn(username, password);
          setLoading(false);
          user && onScreen('USER', navigation)();
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthLoader loading={loading}>
      <Btn onPress={onScreen('SIGN_IN', navigation)}>
        <Text>Sign In</Text>
      </Btn>
      <Text>Or</Text>
      <Btn onPress={onScreen('SIGN_UP', navigation)}>
        <Text> Sign Up</Text>
      </Btn>
    </AuthLoader>
  );
}
