import React, {ReactElement, useState} from 'react';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import {Text} from 'react-native';
import * as Yup from 'yup';

import Btn from '~/components/helpers/Button';
import {Input} from '~/components/Input';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {goBack, onScreen} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ForgotPassword'>;

type ForgotT = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export default function Forgot({route, navigation}: ForgotT): ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const _onPress = async (values: {email: string}): Promise<void> => {
    setLoading(true);
    try {
      const {email} = values;
      const user = await Auth.forgotPassword(email);
      user && onScreen('ForgotPasswordSubmit', navigation, values)();
      setLoading(false);
    } catch (err) {
      setError(error);
    }
  };

  return (
    <Formik
      initialValues={{email: route?.params?.email || ''}}
      onSubmit={(values): Promise<void> => _onPress(values)}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required(),
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
          <Btn onPress={handleSubmit}>
            <Text>Confirm</Text>
          </Btn>
        </>
      )}
    </Formik>
  );
}
