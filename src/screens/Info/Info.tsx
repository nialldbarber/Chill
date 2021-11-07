import React, {ReactElement, useEffect, useState} from 'react';

import {useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {StyleSheet, Text, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SharedElement} from 'react-navigation-shared-element';

import Btn from '~/components/helpers/Button';
import Scroll from '~/components/helpers/Scrollview';
import BackIcon from '~/components/Icons/Back';
import ModalIcon from '~/components/Modal';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {fixedColors} from '~/styles/theme';
import {goHome} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Authenticator'
>;

type UserT = {
  navigation: ProfileScreenNavigationProp;
};

const SCALE = 500.0;
const INITIAL_SCALE = 0;

export default function InfoModalScreen({navigation}: UserT): ReactElement {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    back: {
      position: 'absolute',
      top: hp('7%'),
      left: wp('5%'),
    },
    infoCircle: {
      backgroundColor: fixedColors.lighterGrey,
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: -1,
      width: 30,
      height: 30,
      borderRadius: 500,
    },
    signOut: {
      position: 'absolute',
      backgroundColor: 'red',
      bottom: hp('5%'),
      left: wp('45%'),
      zIndex: 4,
    },
  });

  const scale = useSharedValue<number>(INITIAL_SCALE);

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  useEffect(() => {
    scale.value = withSpring(SCALE);
  }, [scale]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <View style={styles.container}>
      <View style={styles.signOut}>
        <Btn onPress={_onPress}>
          <Text>Sign Out</Text>
        </Btn>
      </View>
      <SharedElement id="info">
        <Animated.View style={[styles.infoCircle, scaleStyles]} />
      </SharedElement>
      <Scroll>
        <ModalIcon style={styles.back} modalScreen="Home">
          <BackIcon />
        </ModalIcon>
        <Text>Hello</Text>
      </Scroll>
    </View>
  );
}
