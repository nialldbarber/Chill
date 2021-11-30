import React, {ReactElement, useState} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import {StyleSheet, Text, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';

import {ActionButton} from '~/components/Button';
import BackIcon from '~/components/Icons/Back';
import {Input} from '~/components/Input';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import ModalIcon from '~/components/Modal/ModalIcon';
import type {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {setUserName} from '~/store/slices/user-name';
import {fixedColors} from '~/styles/theme';
import {onScreen} from '~/utils/navigation';

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type SignUpT = {
  navigation: SignUpScreenNavigationProp;
};

export default function SignUp({navigation}: SignUpT) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    errorText: {
      color: fixedColors.error,
      fontSize: wp('3.2%'),
      marginTop: hp('-0.5%'),
      marginLeft: wp('1%'),
      marginBottom: hp('2%'),
      textAlign: 'center',
    },
  });

  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
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
        user && onScreen('ConfirmSignUp', navigation, {email, password})();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err.code === 'UsernameExistsException') {
          setError('User already exists');
        }
      }
    }
  }

  return (
    <AuthLoader {...{loading}}>
      <View style={styles.container}>
        <ModalIcon modalScreen="Authenticator">
          <BackIcon />
        </ModalIcon>
        <Formik
          initialValues={{email: '', password: '', passwordConfirmation: ''}}
          onSubmit={(values) => {
            dispatch(setUserName(username));
            onPress(values);
          }}
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
          }: {
            values: any;
            handleChange: any;
            errors: any;
            setFieldTouched: any;
            touched: boolean;
            handleSubmit: any;
          }): ReactElement => {
            return (
              <View>
                <Input
                  name="name"
                  placeholder="Username"
                  onChangeText={(text) => setUsername(text)}
                  touched={touched}
                  errors={errors}
                  autoCapitalize="none"
                />
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
                  placeholder="Confirm password"
                  touched={touched}
                  errors={errors}
                  autoCapitalize="none"
                  secureTextEntry
                />
                <Text style={styles.errorText}>{error}</Text>
                <ActionButton text="sign up" onPress={handleSubmit} />
              </View>
            );
          }}
        </Formik>
      </View>
    </AuthLoader>
  );
}
