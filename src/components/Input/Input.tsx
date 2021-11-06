import React, {memo} from 'react';

import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {ERROR_MAP} from '~/constants/errors';
import {fixedColors} from '~/styles/theme';

const textInput = {
  height: hp('5%'),
  width: wp('85%'),
  marginBottom: hp('3%'),
  paddingHorizontal: wp('4.5%'),
  borderRadius: wp('4%'),
  backgroundColor: fixedColors.lighterGrey,
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
      errorText: {
        color: fixedColors.error,
        fontSize: wp('3.2%'),
        marginLeft: wp('1%'),
        marginTop: hp('-2%'),
        marginBottom: hp('2%'),
      },
      textInput,
      errors: {
        ...textInput,
        borderWidth: 1,
        borderColor: fixedColors.error,
      },
    });

    return (
      <>
        <TextInput
          style={
            touched[name] && errors[name] ? styles.errors : styles.textInput
          }
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {touched[name] && errors[name] ? (
          <Text style={styles.errorText}>{ERROR_MAP[errors[name]]}</Text>
        ) : null}
      </>
    );
  },
);

export default Input;
