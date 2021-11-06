import React, {useEffect, useState} from 'react';

import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {ActionButton} from '~/components/Button';
import Wrapper from '~/components/Layout/Wrapper';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {fixedColors} from '~/styles/theme';
import {onScreen} from '~/utils/navigation';

type AuthScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Authenticator'
>;

type AuthenticatorT = {
  navigation: AuthScreenNavigationProp;
};

const windowWidth = Dimensions.get('window').width;

export default function Authenticator({navigation}: AuthenticatorT) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginTop: hp('28%'),
    },
    title: {
      position: 'absolute',
      top: hp('10%'),
      left: wp('10%'),
      fontSize: wp('12%'),
      color: colors.text,
    },
    subTitle: {
      position: 'absolute',
      top: hp('17%'),
      right: wp('10%'),
      fontSize: wp('6%'),
      color: colors.text,
    },
    bubbleContainer: {
      position: 'absolute',
      marginTop: hp('7%'),
      alignItems: 'center',
      width: windowWidth,
      zIndex: 5,
    },
    bubble: {
      position: 'absolute',
      aspectRatio: 1,
      backgroundColor: fixedColors.calm,
      borderRadius: wp('50%'),
    },
    or: {
      alignSelf: 'center',
      marginVertical: hp('1%'),
      fontSize: wp('4.5%'),
    },
  });

  const {navigate} = useNavigation() as any;
  const [loading, setLoading] = useState<boolean>(false);

  const title = useSharedValue<number>(0);
  const subTitle = useSharedValue<number>(0);
  const bubbleOne = useSharedValue<number>(0);
  const bubbleTwo = useSharedValue<number>(0);
  const bubbleThree = useSharedValue<number>(0);
  const buttonWrapper = useSharedValue<number>(0);

  const titleStyles = useAnimatedStyle(() => ({
    opacity: title.value,
  }));

  const subTitleStyles = useAnimatedStyle(() => ({
    opacity: subTitle.value,
  }));

  const bubbleOneStyles = useAnimatedStyle(() => ({
    transform: [{scale: bubbleOne.value}],
  }));

  const bubbleTwoStyles = useAnimatedStyle(() => ({
    transform: [{scale: bubbleTwo.value}],
  }));

  const bubbleThreeStyles = useAnimatedStyle(() => ({
    transform: [{scale: bubbleThree.value}],
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
        console.error(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const duration = 1000;
  const spring = {
    mass: 1.2,
    stiffness: 200,
  };

  useEffect(() => {
    title.value = withDelay(300, withTiming(1, {duration}));
    subTitle.value = withDelay(1000, withTiming(1, {duration}));

    bubbleOne.value = withDelay(2000, withSpring(1, spring));
    bubbleTwo.value = withDelay(2500, withSpring(1, spring));
    bubbleThree.value = withDelay(
      3000,
      withSpring(1, {mass: 1, stiffness: 120}),
    );

    buttonWrapper.value = withDelay(3500, withTiming(1, {duration}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLoader {...{loading}}>
      <View>
        <Animated.Text style={[styles.title, titleStyles]}>
          hey there
        </Animated.Text>
        <Animated.Text style={[styles.subTitle, subTitleStyles]}>
          welcome to chill
        </Animated.Text>
      </View>
      <View style={styles.bubbleContainer}>
        <Animated.View
          style={[
            styles.bubble,
            bubbleOneStyles,
            {top: hp('25%'), width: wp('5%')},
          ]}
        />
        <Animated.View
          style={[
            styles.bubble,
            bubbleTwoStyles,
            {top: hp('31%'), width: wp('7%')},
          ]}
        />
        <Animated.View
          style={[
            styles.bubble,
            bubbleThreeStyles,
            {top: hp('37.5%'), width: wp('9.5%')},
          ]}
        />
      </View>
      <Wrapper style={styles.container}>
        <Animated.View style={buttonWrapperStyles}>
          <ActionButton text="sign in" onPress={() => navigate('SignIn')} />
          <Text style={styles.or}>or</Text>
          <ActionButton text="sign up" onPress={() => navigate('SignUp')} />
        </Animated.View>
      </Wrapper>
    </AuthLoader>
  );
}
