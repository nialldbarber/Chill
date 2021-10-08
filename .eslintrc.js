module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'sort-imports': ['error', {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      'memberSyntaxSortOrder': ['none', 'all', 'single', 'multiple'],
      },
    ],,
  },
};
