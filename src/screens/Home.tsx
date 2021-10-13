import React from 'react';

import {useNavigation, useTheme} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SharedElement} from 'react-navigation-shared-element';
import {useSelector} from 'react-redux';

import Badges from '~/components/Badges';
import Block from '~/components/Block';
import Header from '~/components/Header';
import Scroll from '~/components/helpers/Scrollview';
import SettingsIcon from '~/components/Icons/Settings';
import ModalIcon from '~/components/Modal';
import {RootStackParamList} from '~/components/Navigator/RootNavigator';
import {selectBadges} from '~/store/selectors/exercises';
import {fixedColors} from '~/styles/theme';
import {toggleVisibility} from '~/utils/toggle-visibility';

export type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    blockContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: hp('4%'),
    },
    infoCircle: {
      backgroundColor: fixedColors.lighterGrey,
      position: 'absolute',
      top: hp('7%'),
      right: wp('5%'),
      zIndex: -1,
      width: 1,
      height: 1,
      borderRadius: wp('50%'),
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
      <Scroll>
        <SharedElement id="info">
          <View style={styles.infoCircle} />
        </SharedElement>
        <ModalIcon
          modalScreen="InfoModal"
          customRoute={() =>
            navigate('InfoModal', {
              page: 'info',
            })
          }
        >
          <SettingsIcon />
        </ModalIcon>
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
            ),
          )}
        </Animated.View>
      </Scroll>
    </View>
  );
}
