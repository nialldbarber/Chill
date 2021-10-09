import React from 'react';

import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SharedElement} from 'react-navigation-shared-element';

import ExerciseButton from '~/components/Exercise/Button';
import InstructionsContainer from '~/components/Exercise/Icons/InstructionContainer';
import ExerciseTitle from '~/components/Exercise/Title';
import Btn from '~/components/helpers/Button';
import BackIcon from '~/components/Icons/Back';
import {RootStackParamList} from '~/components/Navigator/RootNavigator';
import {ConfigT, FEELINGS_COLOR_MAP} from '~/constants/exercises';
import {HEIGHT, SHADOW, WIDTH} from '~/constants/theme';
import useGetAnimation from '~/hooks/useGetAnimation';
import useGetHaptics from '~/hooks/useGetHaptics';
import {DEEP_BACKGROUND, FADED_BACKGROUND, fixedColors} from '~/styles/theme';
import {getTime} from '~/utils/time';

type RouteT = {
  key: string;
  name: string;
  params: ConfigT;
  path: undefined;
};

export type Instruct = number | string;
type breathingScreenProp = StackNavigationProp<RootStackParamList, 'Exercise'>;

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
      fontSize: 20,
      fontWeight: '700',
    },
    instructionContainer: {
      position: 'absolute',
      bottom: hp('26%'),
      left: wp('0%'),
      right: wp('0%'),
    },
  });

  const {navigate} = useNavigation<breathingScreenProp>();
  const {
    startCountdown,
    seconds,
    beginExercise,
    handleBeginExercise,
    instructions,
    reset,
    innerCircleStyles,
    animatedText,
  } = useGetAnimation(type, exercise);

  useGetHaptics(instructions);

  return (
    <View style={styles.container}>
      <View style={styles.outerCircleContainer}>
        <Btn style={styles.back} onPress={() => navigate('Home')}>
          <BackIcon />
        </Btn>
        {/* <ModalIcon modalScreen="BreathingInfoModal" mode="dark" /> */}
        {beginExercise ? (
          <Text style={styles.timer}>{getTime(seconds)}</Text>
        ) : null}
        <ExerciseTitle title={exerciseName} hasBegun={beginExercise} />
        <SharedElement id={id.toString()}>
          <View style={styles.outerCircle}>
            <Animated.View style={[styles.innerCircle, innerCircleStyles]}>
              <View>
                {beginExercise ? (
                  <ReText text={animatedText} style={styles.innerText} />
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
        {...{beginExercise, reset, category, startCountdown}}
        action={() => handleBeginExercise(true)}
      />
    </View>
  );
}
