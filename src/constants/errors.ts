export const ERROR_MAP = {
  'email must be a valid email': 'Email must be valid 🤭',
  'password must be at least 6 characters':
    'Password must be at least 6 characters 🤭',
  'passwordConfirmation must be at least 6 characters':
    'Passwords must match 🤭',
};

export const SIGN_IN_ERROR_MAP: Record<string, string> = {
  UsernameExistsException: 'User already exists 🙅',
  InvalidPasswordException: 'Password is invalid 🙅',
  UserNotConfirmedException: 'User not confirmed 🙅',
  PasswordResetRequiredException: 'Password reset failed 🙅',
  NotAuthorizedException: 'Not authorised 🙅',
  UserNotFoundException: 'Hmm user not found 🤔',
};

export const PASSWORD_FORGOT_CONFIRM_ERROR_MAP: Record<string, string> = {
  'Password does not conform to policy: Password not long enough':
    'Password not long enough 🙅',
};

export const FORM_ERRORS: Record<string, string> = {
  'email must be a valid email': 'Email must be valid 🤭',
  'password must be at least 6 characters':
    'Password must be at least 6 characters 🤭',
  'passwordConfirmation must be at least 6 characters':
    'Passwords must match 🤭',

  UsernameExistsException: 'User already exists 🙅',
  InvalidPasswordException: 'Password is invalid 🙅',
  UserNotConfirmedException: 'User not confirmed 🙅',
  PasswordResetRequiredException: 'Password reset failed 🙅',
  NotAuthorizedException: 'Not authorised 🙅',
  UserNotFoundException: 'Hmm user not found 🤔',

  'Password does not conform to policy: Password not long enough':
    'Password not long enough 🙅',

  'email is a required field': 'Email is required 🤭',
  'password is a required field': 'Password is required 🤭',
  'Password is incorrect': 'Password is incorrect 🤭',
};
