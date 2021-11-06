import React, {useState} from 'react';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import {Text, View} from 'react-native';
import * as Yup from 'yup';

import Btn from '~/components/helpers/Button';
import {Input} from '~/components/Input';
import Wrapper from '~/components/Layout/Wrapper';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {goBack, onScreen} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConfirmSignUp'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmSignUp'>;

type ConfirmSignUpT = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export default function ConfirmSignUp({
  navigation,
  route,
}: ConfirmSignUpT): Promise<void> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function onPress(values: {code: string}): Promise<void> {
    setLoading(true);
    setError('');
    try {
      const {code} = values;
      const {email, password} = route.params;
      await Auth.confirmSignUp(email, code, {forceAliasCreation: true});
      const user = await Auth.signIn(email, password);
      user && onScreen('Home', navigation)();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      if (err.code === 'UserNotConfirmedException') {
        setError('Account not verified yet');
      } else if (err.code === 'PasswordResetRequiredException') {
        setError('Existing user found. Please reset your password');
      } else if (err.code === 'NotAuthorizedException') {
        setError('Forgot Password?');
      } else if (err.code === 'UserNotFoundException') {
        setError('User does not exist!');
      }
    }
  }

  async function onResend(): Promise<void> {
    try {
      const {email} = route.params;
      await Auth.resendSignUp(email);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Wrapper>
      <Formik
        initialValues={{code: ''}}
        onSubmit={(values) => onPress(values)}
        validationSchema={Yup.object().shape({
          code: Yup.string().min(6).required(),
        })}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
        }) => (
          <>
            <Input
              name="code"
              value={values.code}
              onChangeText={handleChange('code')}
              onBlur={(): void => setFieldTouched('code')}
              placeholder="Insert code"
              touched={touched}
              errors={errors}
            />
            <Btn onPress={onResend}>
              <Text>Resend code?</Text>
            </Btn>
            {error !== 'Forgot Password?' && <Text>{error}</Text>}
            <Btn onPress={handleSubmit}>
              <Text>Confirm</Text>
            </Btn>
          </>
        )}
      </Formik>
    </Wrapper>
  );
}
