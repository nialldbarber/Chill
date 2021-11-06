import React, {ReactElement, useState} from 'react';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import {Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import * as Yup from 'yup';

import Btn from '~/components/helpers/Button';
import {Input} from '~/components/Input';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {goBack, onScreen} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ForgotPasswordSubmit'
>;
type ProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'ForgotPasswordSubmit'
>;

type ForgotPassSubmitT = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export default function ForgotPasswordSubmit({
  route,
  navigation,
}: ForgotPassSubmitT): ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const _onPress = async (values: {
    email: string;
    password: string;
    code: string;
  }): Promise<void> => {
    setLoading(true);
    try {
      const {email, code, password} = values;
      await Auth.forgotPasswordSubmit(email, code, password);
      await Keychain.setInternetCredentials('auth', email, password);
      await Auth.signIn(email, password);
      onScreen('Home', navigation)();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err?.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: route?.params?.email || '',
          code: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={(values): Promise<void> => _onPress(values)}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required(),
          code: Yup.string().min(6).required(),
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
              name="code"
              value={values.code}
              onChangeText={handleChange('code')}
              onBlur={(): void => setFieldTouched('code')}
              placeholder="Code"
              touched={touched}
              errors={errors}
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
              <Text>Confirm</Text>
            </Btn>
          </>
        )}
      </Formik>
    </>
  );
}
