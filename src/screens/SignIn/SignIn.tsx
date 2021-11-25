import React, {ReactElement, useState} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import {Pressable, StyleSheet, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Yup from 'yup';

import {ActionButton} from '~/components/Button';
import ErrorText from '~/components/Error/ErrorText';
import Btn from '~/components/helpers/Button';
import BackIcon from '~/components/Icons/Back';
import {Input} from '~/components/Input';
import {CardLayout} from '~/components/Layout/CardLayout';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import ModalIcon from '~/components/Modal/ModalIcon';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {P} from '~/components/typography/Paragraph';
import {Title} from '~/components/typography/Title';
import {FORM_ERRORS} from '~/constants/errors';
import {fixedColors} from '~/styles/theme';
import {onScreen} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

type SignInT = {
  navigation?: ProfileScreenNavigationProp;
};

export default function SignIn({navigation}: SignInT): ReactElement {
  const styles = StyleSheet.create({
    back: {
      position: 'absolute',
      top: hp('7%'),
      left: wp('5%'),
    },
    login: {
      marginTop: hp('4%'),
    },
    welcome: {
      alignSelf: 'center',
      width: wp('80%'),
      paddingHorizontal: wp('3%'),
      paddingTop: hp('3%'),
      paddingBottom: hp('5%'),
    },
    welcomeTitle: {
      fontSize: wp('6.5%'),
      color: fixedColors.blackThree,
    },
    welcomeMessage: {
      color: fixedColors.greyOne,
      fontSize: wp('3.7%'),
      marginTop: hp('1%'),
    },
    forgotPassword: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: hp('5%'),
      marginBottom: hp('1%'),
      backgroundColor: fixedColors.white,
    },
    forgotPasswordText: {
      color: fixedColors.blue,
    },
    bottom: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      bottom: hp('5%'),
      width: wp('100%'),
    },
    bottomMessage: {
      color: fixedColors.greyOne,
      marginRight: wp('1%'),
    },
    bottomMessageLink: {
      color: fixedColors.blue,
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

  const forgotPassword = error === 'Forgot Password?';

  return (
    <AuthLoader {...{loading}}>
      <ModalIcon style={styles.back} modalScreen="Authenticator">
        <BackIcon />
      </ModalIcon>
      <CardLayout title={<Title text="Chill" />}>
        <View>
          <View style={styles.welcome}>
            <P style={styles.welcomeTitle} weight="medium">
              Welcome back!
            </P>
            <P style={styles.welcomeMessage}>Login to get back to it</P>
          </View>
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
                  placeholder="Enter your e-mail"
                  touched={touched}
                  errors={errors}
                  autoCapitalize="none"
                />
                <Input
                  name="password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={(): void => setFieldTouched('password')}
                  placeholder="Enter your password"
                  touched={touched}
                  errors={errors}
                  autoCapitalize="none"
                  secureTextEntry
                />
                {error ? <ErrorText text={FORM_ERRORS[error]} /> : null}
                {forgotPassword ? (
                  <ErrorText text={`${FORM_ERRORS['Password is incorrect']}`} />
                ) : null}
                <Pressable
                  style={styles.forgotPassword}
                  onPress={onScreen('ForgotPassword', navigation, userInfo)}
                >
                  <P style={styles.forgotPasswordText} weight="bold">
                    Forgot password?
                  </P>
                </Pressable>
                <ActionButton
                  text="Login"
                  style={styles.login}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
      </CardLayout>
      <View style={styles.bottom}>
        <P style={styles.bottomMessage} weight="medium">
          Don’t have an account?
        </P>
        <Btn onPress={onScreen('SignUp', navigation)}>
          <P style={styles.bottomMessageLink} weight="bold">
            Sign up here
          </P>
        </Btn>
      </View>
    </AuthLoader>
  );
}
