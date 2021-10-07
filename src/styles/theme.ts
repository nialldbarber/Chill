import {useWindowDimensions, Platform} from 'react-native';
import {Theme} from '@react-navigation/native';

export default function getTheme(scheme: any): Theme {
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
      white: '#ffffff',
      primary: '#ff6b6b',
      primaryFaded: 'rgba(255, 107, 107, 0.45)',
      calm: '#9CE2FF',
      calmFaded: 'rgba(156, 226, 255, 0.45)',
      calmDeep: '#2098c9',

      night: '#d49cff',
      nightFaded: 'rgba(212, 156, 255, 0.45)',
      nightDeep: '#7f48a8',

      primaryDeep: '#e85151',
      success: '#20bf6b',
      warning: '#f39c12',
      error: '#e74c3c',
      text: dark ? '#FFFFFF' : '#2D3047',
      background: dark ? '#2D3047' : '#FFFFFF',
      lightGrey: '#f7f7f7',
      border: dark ? '#FFFFFF' : '#1a1a1a',
      button: dark ? '#1a1a1a' : '#FFFFFF',
    },
    // font: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    normalize,
  };
}
