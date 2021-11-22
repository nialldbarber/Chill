import React, {memo, useState} from 'react';

import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import ErrorText from '~/components/Error/ErrorText';
import {ERROR_MAP} from '~/constants/errors';
import {fixedColors} from '~/styles/theme';

const textInput = {
  alignSelf: 'center',
  height: hp('6%'),
  width: wp('80%'),
  marginBottom: hp('1.2%'),
  paddingHorizontal: wp('4.5%'),
  borderRadius: 25,
  backgroundColor: fixedColors.whiteOne,
  borderWidth: 2,
  borderColor: fixedColors.white,
  fontSize: wp('4.5%'),
};

type InputT = {
  name?: string;
  value?: string;
  placeholder?: string;
  errors?: {};
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  touched?: {};
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
};

const Input = memo<InputT>(
  ({
    name,
    value,
    errors,
    placeholder,
    onChangeText,
    onBlur,
    touched,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
  }) => {
    const styles = StyleSheet.create({
      textInput,
      errors: {
        ...textInput,
        borderWidth: 1,
        borderColor: fixedColors.error,
      },
      active: {
        borderColor: fixedColors.blue,
        backgroundColor: fixedColors.white,
        shadowColor: fixedColors.black,
        shadowOffset: {
          width: 1,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      },
    });

    const [active, setActive] = useState(false);

    console.log(errors);

    return (
      <>
        <TextInput
          style={[
            touched[name] && errors[name] ? styles.errors : styles.textInput,
            active && styles.active,
          ]}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          placeholder={placeholder}
          placeholderTextColor={fixedColors.blackFour}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          KeyboardAvoidingView
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {touched[name] && errors[name] ? (
          <ErrorText text={errors[name]} />
        ) : null}
      </>
    );
  },
);

export default Input;
