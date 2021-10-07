import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../Loader';
import {impactAsync} from '../../utils/haptics';

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
      height: hp('20%'),
      backgroundColor: colors.background,
      width: wp('100%'),
      shadowColor: colors.border,
      shadowOffset: {
        width: 1,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
      borderRadius: 30,
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
      width: 250,
      borderRadius: 25,
      backgroundColor: colors.text,
    },
    btnText: {
      color: colors.white,
      fontSize: 20,
    },
  });

  const isLoaderActive = startCountdown && !beginExercise;
  const beginExerciseIfNotActive = () => {
    if (!isLoaderActive) {
      action();
      impactAsync('heavy');
    }
  };

  return (
    <View style={styles.button}>
      <View style={styles.buttonInnerWrap}>
        <View style={styles.buttonInnerMask}>
          {beginExercise ? (
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={1}
              onPress={() => {
                reset();
                impactAsync('heavy');
              }}
            >
              <Text style={styles.btnText}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={1}
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
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
