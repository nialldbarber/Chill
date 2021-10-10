import React, {useEffect, useState} from 'react';

import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, TextInput, View} from 'react-native';
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

import Btn from '~/components/helpers/Button';
import Exit from '~/components/Icons/Exit';
import Spinner from '~/components/Loader/Spinner';
import {RootStackParamList} from '~/components/Navigator/RootNavigator';
import {fixedColors} from '~/styles/theme';
import {setStoredData} from '~/utils/stored-data';

export type onboardingScreenProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

export default function OnboardingScreen() {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      position: 'absolute',
      top: hp('15%'),
      left: wp('8.5%'),
      fontSize: wp('12%'),
    },
    message: {
      fontSize: wp('5%'),
      position: 'absolute',
      top: hp('40%'),
      left: wp('8.5%'),
    },
    inputContainer: {
      position: 'relative',
    },
    exit: {
      position: 'absolute',
      top: hp('3.2%'),
      right: wp('7%'),
    },
    textInput: {
      height: hp('5%'),
      width: wp('85%'),
      margin: hp('2%'),
      paddingVertical: wp('3%'),
      paddingHorizontal: wp('4.5%'),
      borderRadius: wp('4%'),
      backgroundColor: fixedColors.lighterGrey,
      fontSize: wp('4.5%'),
    },
    btn: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp('5%'),
      width: wp('85%'),
      borderRadius: 25,
    },
    btnText: {
      color: fixedColors.white,
      fontSize: wp('5%'),
    },
  });

  const {navigate} = useNavigation<onboardingScreenProp>();
  const [value, setValue] = useState<string>('');
  const [proceed, setProceed] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const title = useSharedValue(0);
  const message = useSharedValue(0);
  const input = useSharedValue(0);

  const titleStyles = useAnimatedStyle(() => ({
    opacity: title.value,
  }));

  const messageStyles = useAnimatedStyle(() => ({
    opacity: title.value,
  }));

  const inputStyles = useAnimatedStyle(() => ({
    opacity: title.value,
  }));

  useEffect(() => {
    const duration = 1000;
    title.value = withTiming(1, {duration});
    message.value = withDelay(1000, withTiming(1, {duration}));
    input.value = withDelay(1500, withTiming(1, {duration}));
  }, [input, message, title]);

  useEffect(() => {
    if (value.length > 0) {
      setProceed(true);
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, titleStyles]}>
        Hey there
      </Animated.Text>
      <Animated.Text style={[styles.message, messageStyles]}>
        Please enter your first name
      </Animated.Text>
      <Animated.View style={[styles.inputContainer, inputStyles]}>
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          style={styles.textInput}
        />
        {value ? (
          <Btn style={styles.exit} onPress={() => setValue('')}>
            <Exit fill={fixedColors.darkGrey} />
          </Btn>
        ) : null}
        <Btn
          style={{
            ...styles.btn,
            backgroundColor: proceed ? colors.text : fixedColors.darkGrey,
          }}
          onPress={() => {
            setStoredData(value);
            navigate('Home');
          }}
          onPressIn={() => setShowLoader(true)}
          disabled={!proceed}
        >
          <>
            {showLoader ? (
              <Spinner />
            ) : (
              <Text style={styles.btnText}>Submit</Text>
            )}
          </>
        </Btn>
      </Animated.View>
    </View>
  );
}
