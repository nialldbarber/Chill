import React, {ReactElement, useState} from 'react';

import {RouteProp, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import {Formik} from 'formik';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import * as Yup from 'yup';

import {ActionButton} from '~/components/Button';
import BackIcon from '~/components/Icons/Back';
import {Input} from '~/components/Input';
import Wrapper from '~/components/Layout/Wrapper';
import {AuthLoader} from '~/components/Loader/AuthLoader';
import ModalIcon from '~/components/Modal';
import {RootStackParamList} from '~/components/Navigator/RootNavigator/RootNavigator';
import {onScreen} from '~/utils/navigation';

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
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    textContainer: {
      marginBottom: hp('3%'),
    },
    text: {
      color: colors.text,
      fontSize: wp('4%'),
    },
  });

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
    <AuthLoader {...{loading}}>
      <Wrapper>
        <ModalIcon modalScreen="Authenticator">
          <BackIcon />
        </ModalIcon>
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
                placeholder="e-mail"
                touched={touched}
                errors={errors}
                autoCapitalize="none"
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>please enter your email to </Text>
                <Text style={styles.text}>request a password reset</Text>
              </View>
              <ActionButton text="confirm" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </Wrapper>
    </AuthLoader>
  );
}
