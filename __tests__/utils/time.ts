import {fmtInSTM, fmtOutSTM, getTime, secToMill} from '~/utils/time';

describe('getTime()', () => {
  it('should return 1 second, aka "00:01" if the value is <number> 1', () => {
    expect(getTime(1)).toBe('00:01');
  });

  it('should return 1 second, aka "00:01" if the value of <string> 1 ', () => {
    expect(getTime('1')).toBe('00:01');
  });

  it('should return an empty string if an non-number is provided', () => {
    expect(getTime('this is a test')).toBe('');
  });
});
