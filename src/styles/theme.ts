import {Platform, useWindowDimensions} from 'react-native';

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
      primary: '#ff6b6b',
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
  white: '#ffffff',
  primary: '#ff6b6b',
  primaryFaded: 'rgba(255, 107, 107, 0.45)',
  calm: '#9CE2FF',
  calmFaded: 'rgba(156, 226, 255, 0.45)',
  calmDeep: '#2098c9',

  night: '#d49cff',
  nightFaded: 'rgba(212, 156, 255, 0.45)',
  nightDeep: '#945abf',

  primaryDeep: '#e85151',
  success: '#20bf6b',
  warning: '#f39c12',
  error: '#e74c3c',
  lightGrey: '#f7f7f7',
  lighterGrey: '#F2F5F9',
  darkGrey: '#A09FA2',
};

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
