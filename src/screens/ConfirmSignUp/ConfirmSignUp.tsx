import React, {useState} from 'react';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {Formik} from 'formik';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

import {createUser} from '../../graphql/mutations';
import {ActionButton} from '~/components/Button';
import BackIcon from '~/components/Icons/Back';
import {Input} from '~/components/Input';
import Wrapper from '~/components/Layout/Wrapper';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import ModalIcon from '~/components/Modal/ModalIcon';
import type {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {selectName} from '~/store/selectors/user-name';
import {onScreen} from '~/utils/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConfirmSignUp'
>;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ConfirmSignUp'>;

type ConfirmSignUpT = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export default function ConfirmSignUp({navigation, route}: ConfirmSignUpT) {
  const name = useSelector(selectName);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function addNewUserToDB(email: string): Promise<void> {
    try {
      // create a user in the USER API
      await API.graphql(
        graphqlOperation(createUser, {
          input: {
            id: email,
            name,
            username: email,
          },
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function onPress(values: {code: string}): Promise<void> {
    setLoading(true);
    setError('');
    try {
      const {code} = values;
      const {email, password} = route.params;
      await Auth.confirmSignUp(email, code, {forceAliasCreation: true});
      const user = await Auth.signIn(email, password);

      addNewUserToDB(email);

      user && onScreen('Home', navigation)();
      setLoading(false);
    } catch (err: any) {
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
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <AuthLoader {...{loading}}>
      <Wrapper>
        <ModalIcon modalScreen="Authenticator">
          <BackIcon />
        </ModalIcon>
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
              <ActionButton text="resend code?" onPress={onResend} />
              {error !== 'Forgot Password?' && <Text>{error}</Text>}
              <ActionButton text="confirm" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </Wrapper>
    </AuthLoader>
  );
}
