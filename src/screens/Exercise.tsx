import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ReText} from 'react-native-redash';
import {RootStackParamList} from '~/components/Navigators/RootNavigator';
import useGetAnimation from '~/hooks/useGetAnimation';
import useGetHaptics from '~/hooks/useGetHaptics';
import Btn from '~/components/Button';
import ExerciseButton from '~/components/Exercise/Button';
import ExerciseTitle from '~/components/Exercise/Title';
import BackIcon from '~/components/Icons/Back';
import InstructionsContainer from '~/components/Exercise/Icons/InstructionContainer';
import {getTime} from '~/utils/time';
import {fixedColors, FADED_BACKGROUND, DEEP_BACKGROUND} from '~/styles/theme';
import {SHADOW, WIDTH, HEIGHT} from '~/constants/theme';
import {ConfigT, FEELINGS_COLOR_MAP} from '~/constants/exercises';

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
    info: {
      position: 'absolute',
      top: hp('7%'),
      right: wp('-5%'),
      width: 100,
      height: 100,
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
