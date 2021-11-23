import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {StyleSheet, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {ActionButton} from '~/components/Button';
import Onboarding from '~/components/Icons/Onboarding';
import {CardLayout} from '~/components/Layout/CardLayout';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {P} from '~/components/typography/Paragraph';
import {Title} from '~/components/typography/Title';
import {fixedColors} from '~/styles/theme';
import {haptics} from '~/utils/haptics';
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
    innerCard: {
      height: hp('70%'),
      alignItems: 'center',
    },
    floatingIcon: {
      position: 'absolute',
      top: hp('6.5%'),
    },
    onboarding: {
      position: 'absolute',
      top: hp('35%'),
    },
    welcomeMessage: {
      textAlign: 'center',
      fontSize: wp('5%'),
      width: wp('55%'),
      color: fixedColors.blackThree,
    },
    underline: {
      textDecorationLine: 'underline',
    },
    buttons: {
      position: 'absolute',
      bottom: hp('7%'),
    },
    signInBtn: {
      marginBottom: hp('1.2%'),
    },
  });

  const {navigate} = useNavigation() as any;
  const [loading, setLoading] = useState<boolean>(false);

  const title = useSharedValue<number>(0);
  const buttonWrapper = useSharedValue<number>(0);

  const titleStyles = useAnimatedStyle(() => ({
    opacity: title.value,
  }));

  const buttonWrapperStyles = useAnimatedStyle(() => ({
    opacity: buttonWrapper.value,
  }));

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
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const duration = 1000.0;

  useEffect(() => {
    title.value = withDelay(300, withTiming(1, {duration}));

    buttonWrapper.value = withDelay(1500, withTiming(1, {duration}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLoader {...{loading}}>
      <CardLayout title={<Title style={titleStyles} text="Chill" />}>
        <View style={styles.innerCard}>
          <View style={styles.floatingIcon}>
            <Onboarding />
          </View>
          <View style={styles.onboarding}>
            <P style={styles.welcomeMessage}>
              Hey there,{' '}
              <P style={styles.underline} weight="bold">
                login
              </P>{' '}
              or{' '}
              <P style={styles.underline} weight="bold">
                sign up
              </P>{' '}
              to continue
            </P>
          </View>
          <Animated.View style={[styles.buttons, buttonWrapperStyles]}>
            <ActionButton
              text="Login"
              style={styles.signInBtn}
              onPress={() => {
                navigate('SignIn');
                haptics.selection();
              }}
            />
            <ActionButton
              text="Sign up"
              type="secondary"
              onPress={() => {
                navigate('SignUp');
                haptics.selection();
              }}
            />
          </Animated.View>
        </View>
      </CardLayout>
    </AuthLoader>
  );
}
