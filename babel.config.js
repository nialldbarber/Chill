module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~/src': './src',
          '~/components': './src/components',
          '~/constants': './src/constants',
          '~/hooks': './src/hooks',
          '~/screens': './src/screens',
          '~/styles': './src/styles',
          '~/types': './src/types',
          '~/utils': './src/utils',
          '~/assets': './src/assets',
          '~/store': './src/store',
          '~/graphql': './src/graphql',
        },
      },
    ],
  ],
};
