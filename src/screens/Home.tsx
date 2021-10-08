import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {selectBadges} from '~/store/selectors/exercises';
import Badges from '~/components/Badges';
import Block from '~/components/Block';
import Header from '~/components/Header';
import ModalIcon from '~/components/Modal';
import {RootStackParamList} from '~/components/Navigators/RootNavigator';
import {toggleVisibility} from '~/utils/toggle-visibility';

export type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const {colors} = useTheme() as any;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    modal: {
      position: 'absolute',
      top: hp('7%'),
      right: wp('5%'),
      zIndex: 3,
    },
    blockContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: hp('4%'),
    },
  });

  const {navigate} = useNavigation<homeScreenProp>() as any;
  const exercises = useSelector(selectBadges);
  const blockContainerOpacity = useSharedValue<number>(1);

  const blockContainerStyle = useAnimatedStyle(() => ({
    opacity: blockContainerOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <ScrollView>
        <ModalIcon modalScreen="InfoModal" mode="light" />
        <Header />
        <Badges
          press={() => toggleVisibility(blockContainerOpacity, true, 500)}
        />
        <Animated.View style={[styles.blockContainer, blockContainerStyle]}>
          {exercises.map(
            ({id, exerciseName, page, exercise, type, category}) => (
              <Block
                key={id}
                id={id.toString()}
                title={exerciseName}
                category={category}
                onPress={() =>
                  navigate(page, {
                    id,
                    exerciseName,
                    exercise,
                    category,
                    type,
                  })
                }
              />
            )
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
