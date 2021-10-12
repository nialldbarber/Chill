module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:import/typescript'],
  plugins: ['import'],
  rules: {
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'func-names': 0,
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-duplicates': 2,
    'import/prefer-default-export': 0,
    'import/no-unused-modules': 0,
    'react-hooks/rules-of-hooks': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-unused-styles': 2,
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 2,
  },
};
