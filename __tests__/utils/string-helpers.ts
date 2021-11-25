import {capitalise, isValueAString} from '~/utils/string-helpers';

describe('capitalise()', () => {
  it('should capitalise the first letter of a word', () => {
    expect(capitalise('test')).toBe('Test');
  });

  it('should only capitalise the first word and ignore any others', () => {
    expect(capitalise('this is a test')).toBe('This is a test');
  });

  it('should return an empty string if no input is detected', () => {
    expect(capitalise('')).toBe('');
  });

  it('should return a number, if a number is provided', () => {
    expect(capitalise('1')).toBe('1');
  });
});

describe('isValueAString()', () => {
  it('should return true if a string is provided', () => {
    expect(isValueAString('test')).toBe(true);
  });

  it('should return false if a number is provided', () => {
    expect(isValueAString(1)).toBe(false);
  });
});
