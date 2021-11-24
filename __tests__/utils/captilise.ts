import {capitalise} from '~/utils/capitalise';

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
});
