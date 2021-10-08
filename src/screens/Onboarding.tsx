import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {setStoredData} from '~/utils/stored-data';
import Btn from '~/components/Button';
import Exit from '~/components/Icons/Exit';
import {fixedColors} from '~/styles/theme';

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
      backgroundColor: colors.text,
    },
    btnText: {
      color: fixedColors.white,
      fontSize: wp('5%'),
    },
  });

  const {navigate} = useNavigation() as any;
  const [value, setValue] = useState<string>('');

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
  }, []);

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
          style={styles.btn}
          onPress={() => {
            setStoredData(value);
            navigate('Home');
          }}
        >
          <Text style={styles.btnText}>Submit</Text>
        </Btn>
      </Animated.View>
    </View>
  );
}
