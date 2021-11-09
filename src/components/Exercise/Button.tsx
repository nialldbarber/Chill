import React from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
} from 'react-native-health';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';

import Btn from '~/components/helpers/Button';
import Loader from '~/components/Loader';
import {
  selectHasBegun,
  selectHasCountdownStarted,
} from '~/store/selectors/individual-exercise';
import {fixedColors} from '~/styles/theme';
import {haptics} from '~/utils/haptics';

type ExerciseButtonProps = {
  reset: () => void;
  action: () => void;
};

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.MindfulSession],
    write: [AppleHealthKit.Constants.Permissions.MindfulSession],
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  if (error) {
    console.log('[ERROR] Cannot grant permissions!');
  }

  AppleHealthKit.getAuthStatus(permissions, (err, results) => {
    console.log(err, results);
  });

  const options = {
    startDate: new Date(2021, 0, 0).toISOString(), // required
    endDate: new Date().toISOString(), // optional; default now
  };

  // AppleHealthKit.saveMindfulSession(
  //   (options: HealthInputOptions),
  //   (err: Object, results: number) => {
  //     if (err)
  //       return {
  //         return,
  //       }
  //     // mindfullSession successfully saved
  //   },
  // )
});

export default function ExerciseButton({reset, action}: ExerciseButtonProps) {
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

  const hasExerciseBegun = useSelector(selectHasBegun);
  const hasCountdownStarted = useSelector(selectHasCountdownStarted);
  const isLoaderActive = hasCountdownStarted && !hasExerciseBegun;

  function beginExerciseIfNotActive(): void {
    if (!isLoaderActive) {
      action();
      haptics.impactHeavy();
    }
  }

  function cancelExercise(): void {
    reset();
    haptics.impactHeavy();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        {hasExerciseBegun ? (
          <Btn style={styles.button} onPress={cancelExercise}>
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
