import {Platform, useWindowDimensions} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type ThemeT = {
  dark: boolean;
  width: number;
  height: number;
  ios: boolean;
  margin: number;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
  normalize: (size: number, max: number) => number;
};

export default function getTheme(scheme: string): ThemeT {
  const {width, height} = useWindowDimensions();
  const dark = scheme === 'dark';
  const normalize = (size: number, max: number) =>
    Math.min(size * (width / 375), max);

  return {
    dark,
    width,
    height,
    ios: Platform.OS === 'ios',
    margin: normalize(20, 35),
    colors: {
      primary: dark ? '#ff6b6b' : 'green',
      background: dark ? '#2D3047' : '#FFFFFF',
      card: '#FFFFFF',
      text: dark ? '#FFFFFF' : '#2D3047',
      border: dark ? '#FFFFFF' : '#1a1a1a',
      notification: '',
    },
    normalize,
  };
}

export const fixedColors: Record<string, string> = {
  primary: '#FFB99C',
  primaryFaded: 'rgba(255, 185, 156, 0.45)',
  calm: '#9CE2FF',
  calmFaded: 'rgba(156, 226, 255, 0.45)',
  calmDeep: '#2098c9',

  night: '#dec1f5',
  nightFaded: 'rgba(212, 156, 255, 0.45)',
  nightDeep: '#a086b5',

  primaryDeep: '#de7549',
  success: '#20bf6b',
  warning: '#f39c12',
  error: '#e74c3c',
  lightGrey: '#f7f7f7',
  lighterGrey: '#F2F5F9',
  darkGrey: '#A09FA2',

  // new colours
  white: 'rgba(255, 255, 255, 1)',
  whiteOne: 'rgba(248, 247, 251, 1)',

  black: 'rgba(0, 0, 0, 1)',
  blackOne: 'rgba(70, 70, 70, 1)',
  blackTwo: 'rgba(0, 0, 0, 0.3)',
  blackThree: 'rgba(63, 61, 86, 1)',
  blackFour: '#878790',

  greyOne: 'rgba(150, 154, 168, 1)',

  blue: 'rgba(110, 166, 255, 1)',
  lightBlue: 'rgba(174, 201, 244, 1)',
  blueOne: 'rgba(227, 244, 252, 1)',
  blueTwo: 'rgba(143, 219, 255, 1)',
  blueThree: 'rgba(241, 247, 255, 1)',

  orange: 'rgba(255, 135, 118, 1)',
  orangeTwo: 'rgba(251, 236, 237, 1)',

  purple: 'rgba(177, 177, 255, 1)',
  purpleOne: 'rgba(237, 237, 250, 1)',
};

export const buttons = {
  background: {
    primary: {
      backgroundColor: fixedColors.blue,
      borderColor: fixedColors.blue,
    },
    secondary: {
      backgroundColor: fixedColors.white,
      borderColor: fixedColors.blue,
    },
  },
  text: {
    primary: {
      color: fixedColors.white,
    },
    secondary: {
      color: fixedColors.blue,
    },
  },
};

// export const spacing = {
//   paddingHorizontal:
// };

export const FADED_BACKGROUND: Record<string, string> = {
  calm: fixedColors.calmFaded,
  energy: fixedColors.primaryFaded,
  night: fixedColors.nightFaded,
};

export const DEEP_BACKGROUND: Record<string, string> = {
  calm: fixedColors.calmDeep,
  energy: fixedColors.primaryDeep,
  night: fixedColors.nightDeep,
};

export const WIDTH = 300;
export const HEIGHT = 300;
export const ORIGINAL_SIZE = WIDTH / 3;

export const SHADOW = {
  shadowOffset: {
    width: 1,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 5,
};
