import React, {useEffect, useState} from 'react';

import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {StyleSheet, Text, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp('5%'),
      width: wp('85%'),
      borderRadius: 25,
      backgroundColor: 'red',
    },
    btnText: {
      color: colors.background,
      fontSize: wp('5%'),
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
          user && onScreen('Home', navigation)();
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
      <View>
        <Text>hey there</Text>
        <Text>welcome to chill</Text>
      </View>
      <Btn style={styles.btn} onPress={() => navigate('SignIn')}>
        <Text style={styles.btnText}>Sign In</Text>
      </Btn>
      <Text>Or</Text>
      <Btn style={styles.btn} onPress={() => navigate('SignUp')}>
        <Text style={styles.btnText}>Sign Up</Text>
      </Btn>
    </View>
  );
}
