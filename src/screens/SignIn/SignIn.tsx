import React, {ReactElement, useState} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import {Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as Yup from 'yup';

import Btn from '~/components/helpers/Button';
import {Input} from '~/components/Input';
import Wrapper from '~/components/Layout/Wrapper';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {goBack, onScreen} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

type SignInT = {
  navigation: ProfileScreenNavigationProp;
};

export default function SignIn({navigation}: SignInT): ReactElement {
  const [userInfo, setUserInfo] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const _onPress = async (values: {
    email: string;
    password: string;
  }): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const {email, password} = values;
      const user = await Auth.signIn(email, password);
      await Keychain.setInternetCredentials('auth', email, password);
      user && onScreen('Home', navigation)();
      setLoading(false);
    } catch ({code}) {
      setLoading(false);
      if (code === 'UserNotConfirmedException') {
        setError('Account not verified yet');
      } else if (code === 'PasswordResetRequiredException') {
        setError('Existing user found. Please reset your password');
      } else if (code === 'NotAuthorizedException') {
        setUserInfo(values);
        setError('Forgot Password?');
      } else if (code === 'UserNotFoundException') {
        setError('User does not exist!');
      } else {
        setError(code);
      }
    }
  };

  return (
    <Wrapper>
      <Formik
        enableReinitialize
        initialValues={userInfo}
        onSubmit={(values) => _onPress(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().min(6).required(),
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
            {error !== 'Forgot Password?' && <Text>{error}</Text>}
            {error === 'Forgot Password?' && (
              <Btn onPress={onScreen('ForgotPassword', navigation, userInfo)}>
                <Text>{error}</Text>
              </Btn>
            )}
            <Btn onPress={handleSubmit}>
              <Text>Sign In</Text>
            </Btn>
          </>
        )}
      </Formik>
    </Wrapper>
  );
}
