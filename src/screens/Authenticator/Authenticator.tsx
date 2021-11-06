import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {StyleSheet, Text, View} from 'react-native';
import * as Keychain from 'react-native-keychain';

import Btn from '~/components/helpers/Button';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {onScreen} from '~/utils/navigation';

type AuthScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Authenticator'
>;

type AuthenticatorT = {
  navigation: AuthScreenNavigationProp;
};

export default function Authenticator({navigation}: AuthenticatorT) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const {navigate} = useNavigation() as any;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <AuthLoader {...{loading}}>
        <Btn onPress={() => navigate('SignIn')}>
          <Text>Sign In</Text>
        </Btn>
        <Text>Or</Text>
        <Btn onPress={() => navigate('SignUp')}>
          <Text> Sign Up</Text>
        </Btn>
      </AuthLoader>
    </View>
  );
}
