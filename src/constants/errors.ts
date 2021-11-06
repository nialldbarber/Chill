export const ERROR_MAP = {
  'email must be a valid email': 'email must be valid',
  'password must be at least 6 characters':
    'password must be at least 6 characters',
  'passwordConfirmation must be at least 6 characters': 'passwords must match',
};

export const SIGN_IN_ERROR_MAP: Record<string, string> = {
  UsernameExistsException: 'user already exists',
  InvalidPasswordException: 'password is invalid',
};

export const PASSWORD_FORGOT_CONFIRM_ERROR_MAP: Record<string, string> = {
  'Password does not conform to policy: Password not long enough':
    'password not long enough',
};
