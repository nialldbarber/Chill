import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {selectBadges} from '../store/selectors/exercises';
import {getCurrentTime} from '../utils/get-date';
import Block from '../components/Block';
import {RootStackParamList} from '../components/Navigators/RootNavigator';
import Badges from '../components/Badges';
import ModalIcon from '../components/Modal';
import {useSelector} from 'react-redux';

const lottie = require('../assets/landscape.json');

export type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const {colors, normalize} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modal: {
      position: 'absolute',
      top: hp('7%'),
      right: wp('5%'),
      zIndex: 3,
    },
    textWrapper: {
      flex: 2,
      marginTop: hp('8%'),
      paddingLeft: wp('7%'),
      paddingRight: wp('7%'),
    },
    text: {
      fontSize: wp('10%'),
      width: wp('50%'),
      color: colors.text,
    },
    subText: {
      fontSize: wp('4.5%'),
      color: colors.text,
    },
    header: {
      color: colors.text,
      fontSize: wp('8%'),
      fontWeight: '400',
      paddingLeft: 35,
    },
    blockContainer: {
      justifyContent: 'center',
      marginBottom: hp('4%'),
    },
    flatListContainer: {
      margin: wp('5%'),
      paddingBottom: 0,
    },
    lottie: {
      alignSelf: 'center',
      width: normalize(320, 400),
    },
  });

  const {navigate} = useNavigation<homeScreenProp>();
  const exercises = useSelector(selectBadges);
  const headerOpacity = useSharedValue<number>(0);
  const subHeaderOpacity = useSharedValue<number>(0);

  const colorStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const subColorStyle = useAnimatedStyle(() => ({
    opacity: subHeaderOpacity.value,
  }));

  useEffect(() => {
    headerOpacity.value = withTiming(1, {duration: 1000});
    subHeaderOpacity.value = withDelay(1000, withTiming(1, {duration: 1000}));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ModalIcon modalScreen="InfoModal" mode="light" />
        <View style={styles.textWrapper}>
          <Animated.Text style={[styles.text, colorStyle]}>
            {getCurrentTime()}
          </Animated.Text>
          <LottieView autoPlay loop style={styles.lottie} source={lottie} />
          <Animated.Text style={[styles.subText, subColorStyle]}>
            How would you like to feel today?
          </Animated.Text>
        </View>
        <Badges />
        <View style={styles.blockContainer}>
          <FlatList
            data={exercises}
            renderItem={({
              item: {id, exerciseName, page, exercise, type, category},
              index,
            }: any) => (
              <Block
                id={id}
                title={exerciseName}
                onPress={() =>
                  navigate(page, {
                    id,
                    exerciseName,
                    exercise,
                    category,
                    type,
                  })
                }
                category={category}
                delay={index * 400}
              />
            )}
            keyExtractor={({id}) => id}
            numColumns={2}
            columnWrapperStyle={{
              marginHorizontal: wp('3.5%'),
              justifyContent: 'space-between',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
