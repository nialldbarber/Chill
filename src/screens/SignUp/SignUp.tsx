import React, {ReactElement, useState} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import {Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as Yup from 'yup';

import Btn from '~/components/helpers/Button';
import {Input} from '~/components/Input';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {goBack, onScreen} from '~/utils/navigation';

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type SignUpT = {
  navigation: SignUpScreenNavigationProp;
};

export default function SignUp({navigation}: SignUpT) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  type PressT = {
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  async function onPress(values: PressT): Promise<void> {
    const {email, password, passwordConfirmation} = values;

    if (password !== passwordConfirmation) {
      setError('Passwords do not match!');
    } else {
      setLoading(true);
      setError('');
      try {
        const user = await Auth.signUp(email, password);
        await Keychain.setInternetCredentials('auth', email, password);
        user && onScreen('CONFIRM_SIGN_UP', navigation, {email, password})();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.code === 'UserNotConfirmedException') {
          setError('Account not verified yet');
        } else if (err.code === 'PasswordResetRequiredException') {
          setError('Existing user found. Please reset your password');
        } else if (err.code === 'NotAuthorizedException') {
          setError('Forgot Password?');
        } else if (err.code === 'UserNotFoundException') {
          setError('User does not exist!');
        } else {
          setError(err.code);
        }
      }
    }
  }

  console.log('WE ARE ON THE SIGN UP PAGE');
  console.log({loading});

  return (
    <AuthLoader {...{loading}}>
      <Formik
        initialValues={{email: '', password: '', passwordConfirmation: ''}}
        onSubmit={(values) => onPress(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().min(6).required(),
          passwordConfirmation: Yup.string().min(6).required(),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
        }): ReactElement => (
          <>
            <Input
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={(): void => setFieldTouched('email')}
              placeholder="E-mail"
              touched={touched}
              errors={errors}
              autoCapitalize="none"
            />
            <Input
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={(): void => setFieldTouched('password')}
              placeholder="Password"
              touched={touched}
              errors={errors}
              autoCapitalize="none"
              secureTextEntry
            />
            <Input
              name="passwordConfirmation"
              value={values.passwordConfirmation}
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={(): void => setFieldTouched('passwordConfirmation')}
              placeholder="Password confirm"
              touched={touched}
              errors={errors}
              autoCapitalize="none"
              secureTextEntry
            />
            {error !== '' && <Text>{error}</Text>}
            <Btn onPress={handleSubmit}>
              <Text>Sign Up</Text>
            </Btn>
          </>
        )}
      </Formik>
    </AuthLoader>
  );
}
