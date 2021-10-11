import React from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Btn from '~/components/helpers/Button';
import Loader from '~/components/Loader';
import {fixedColors} from '~/styles/theme';
import {impactAsync} from '~/utils/haptics';

type ExerciseButtonProps = {
  hasCountdownStarted: boolean;
  hasBegun: boolean;
  reset: () => void;
  action: () => void;
};

export default function ExerciseButton({
  hasCountdownStarted,
  hasBegun,
  reset,
  action,
}: ExerciseButtonProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: wp('100%'),
      height: hp('20%'),
      backgroundColor: colors.background,
      borderRadius: 30,
      shadowColor: colors.border,
      shadowOffset: {
        width: 1,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    buttonWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp('5%'),
      width: wp('65%'),
      borderRadius: 25,
      backgroundColor: colors.text,
    },
    buttonText: {
      color: fixedColors.white,
      fontSize: wp('5%'),
    },
  });

  const isLoaderActive = hasCountdownStarted && !hasBegun;

  function beginExerciseIfNotActive(): void {
    if (!isLoaderActive) {
      action();
      impactAsync('heavy');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        {hasBegun ? (
          <Btn
            style={styles.button}
            onPress={() => {
              reset();
              impactAsync('heavy');
            }}
          >
            <Text style={styles.buttonText}>Stop</Text>
          </Btn>
        ) : (
          <Btn
            style={styles.button}
            disabled={isLoaderActive}
            onPress={beginExerciseIfNotActive}
          >
            <View>
              {isLoaderActive ? (
                <Loader active={isLoaderActive} />
              ) : (
                <Text style={styles.buttonText}>Begin</Text>
              )}
            </View>
          </Btn>
        )}
      </View>
    </View>
  );
}
