import React, {ReactElement, useState} from 'react';

import {useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import {StyleSheet} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Yup from 'yup';

import {ActionButton} from '~/components/Button';
import ErrorText from '~/components/Error/ErrorText';
import BackIcon from '~/components/Icons/Back';
import {Input} from '~/components/Input';
import Wrapper from '~/components/Layout/Wrapper';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import ModalIcon from '~/components/Modal/ModalIcon';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {onScreen} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

type SignInT = {
  navigation: ProfileScreenNavigationProp;
};

export default function SignIn({navigation}: SignInT): ReactElement {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    back: {
      position: 'absolute',
      top: hp('7%'),
      left: wp('5%'),
    },
  });

  const [userInfo, setUserInfo] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onPress(values: {
    email: string;
    password: string;
  }): Promise<void> {
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
  }

  return (
    <AuthLoader {...{loading}}>
      <Wrapper>
        <ModalIcon style={styles.back} modalScreen="Authenticator">
          <BackIcon />
        </ModalIcon>
        <Formik
          enableReinitialize
          initialValues={userInfo}
          onSubmit={(values) => onPress(values)}
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
                placeholder="e-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <Input
                name="password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={(): void => setFieldTouched('password')}
                placeholder="password"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
                secureTextEntry
              />
              {error ? <ErrorText text={error} /> : null}
              <ActionButton
                text="forgot password?"
                error
                onPress={onScreen('ForgotPassword', navigation, userInfo)}
              />
              <ActionButton text="sign in" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </Wrapper>
    </AuthLoader>
  );
}
