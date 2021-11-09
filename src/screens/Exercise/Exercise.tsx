import React from 'react';

import {useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SharedElement} from 'react-navigation-shared-element';
import {useDispatch, useSelector} from 'react-redux';

import ExerciseButton from '~/components/Exercise/Button';
import InstructionsContainer from '~/components/Exercise/Icons/InstructionContainer';
import ExerciseTitle from '~/components/Exercise/Title';
import BackIcon from '~/components/Icons/Back';
import ModalIcon from '~/components/Modal/ModalIcon';
import {ConfigT, FEELINGS_COLOR_MAP} from '~/constants/exercises';
import useGetAnimation from '~/hooks/useGetAnimation';
import useGetHaptics from '~/hooks/useGetHaptics';
import {
  selectHasBegun,
  selectHasCountdownStarted,
} from '~/store/selectors/individual-exercise';
import {
  setBeginExercise,
  setStartCountdown,
} from '~/store/slices/individual-exercise';
import {
  DEEP_BACKGROUND,
  FADED_BACKGROUND,
  HEIGHT,
  SHADOW,
  WIDTH,
  fixedColors,
} from '~/styles/theme';
import {getTime} from '~/utils/time';

type RouteT = {
  key: string;
  name: string;
  params: ConfigT;
  path: undefined;
};

export type Instruct = number | string;

export default function ExerciseScreen({route}: {route: RouteT}) {
  const {id, exerciseName, exercise, type, category} = route.params;
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    timer: {
      position: 'absolute',
      fontSize: wp('5%'),
      top: hp('6%'),
      color: colors.text,
    },
    back: {
      position: 'absolute',
      top: hp('7%'),
      left: wp('5%'),
    },
    outerCircleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    outerCircle: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      width: WIDTH,
      height: HEIGHT,
      borderRadius: WIDTH / 2,
      backgroundColor: colors.background,
      shadowColor: colors.text,
      ...SHADOW,
    },
    innerCircle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      alignSelf: 'center',
      borderWidth: 3,
      borderColor: fixedColors[FEELINGS_COLOR_MAP[category || '']],
      backgroundColor: FADED_BACKGROUND[category || ''],
    },
    innerText: {
      color: DEEP_BACKGROUND[category || ''],
      fontSize: wp('4.5%'),
      fontWeight: '700',
      textAlign: 'center',
    },
    instructionContainer: {
      position: 'absolute',
      bottom: hp('26%'),
      left: wp('0%'),
      right: wp('0%'),
    },
  });

  const dispatch = useDispatch();
  const hasBegun = useSelector(selectHasBegun);
  const hasCountdownStarted = useSelector(selectHasCountdownStarted);
  const {seconds, reset, innerCircleStyles, animatedText, instructions} =
    useGetAnimation(type, exercise);

  function handleExercise(cond: boolean): void {
    dispatch(setStartCountdown(true));
    if (cond) {
      setTimeout(() => {
        dispatch(setBeginExercise(cond));
      }, 4000);
    } else {
      dispatch(setBeginExercise(cond));
    }
  }

  useGetHaptics(animatedText, instructions);

  return (
    <View style={styles.container}>
      <View style={styles.outerCircleContainer}>
        <ModalIcon style={styles.back} modalScreen="Home" onPress={reset}>
          <BackIcon />
        </ModalIcon>
        {hasBegun ? <Text style={styles.timer}>{getTime(seconds)}</Text> : null}
        <ExerciseTitle title={exerciseName} {...{hasBegun}} />
        <SharedElement id={id.toString()}>
          <View style={styles.outerCircle}>
            <Animated.View style={[styles.innerCircle, innerCircleStyles]}>
              <View>
                {hasBegun ? (
                  <Text style={styles.innerText}>{animatedText?.value}</Text>
                ) : null}
              </View>
            </Animated.View>
          </View>
        </SharedElement>
      </View>
      <View style={styles.instructionContainer}>
        <InstructionsContainer {...{type, exercise}} />
      </View>
      <ExerciseButton
        {...{reset, category, hasCountdownStarted}}
        action={() => handleExercise(true)}
      />
    </View>
  );
}
