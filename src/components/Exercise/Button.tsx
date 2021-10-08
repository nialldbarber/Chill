import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {impactAsync} from '~/utils/haptics';
import Btn from '~/components/Button';
import Loader from '~/components/Loader';
import {fixedColors} from '~/styles/theme';

type ExerciseButtonProps = {
  startCountdown: boolean;
  beginExercise: boolean;
  reset: () => void;
  action: () => void;
};

export default function ExerciseButton({
  startCountdown,
  beginExercise,
  reset,
  action,
}: ExerciseButtonProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    button: {
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
    buttonInnerWrap: {
      ...StyleSheet.absoluteFillObject,
    },
    buttonInnerMask: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      height: hp('5%'),
      width: wp('65%'),
      borderRadius: 25,
      backgroundColor: colors.text,
    },
    btnText: {
      color: fixedColors.white,
      fontSize: wp('5%'),
    },
  });

  const isLoaderActive = startCountdown && !beginExercise;

  function beginExerciseIfNotActive(): void {
    if (!isLoaderActive) {
      action();
      impactAsync('heavy');
    }
  }

  return (
    <View style={styles.button}>
      <View style={styles.buttonInnerWrap}>
        <View style={styles.buttonInnerMask}>
          {beginExercise ? (
            <Btn
              style={styles.btn}
              onPress={() => {
                reset();
                impactAsync('heavy');
              }}
            >
              <Text style={styles.btnText}>Stop</Text>
            </Btn>
          ) : (
            <Btn
              style={styles.btn}
              disabled={isLoaderActive}
              onPress={beginExerciseIfNotActive}
            >
              <View>
                {isLoaderActive ? (
                  <Loader active={isLoaderActive} />
                ) : (
                  <Text style={styles.btnText}>Begin</Text>
                )}
              </View>
            </Btn>
          )}
        </View>
      </View>
    </View>
  );
}
