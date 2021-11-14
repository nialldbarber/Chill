import {timeOfDayGreeting} from '../../src/utils/getDate';

describe('truth', () => {
  it('is true', () => {
    const options = ['Good Morning', 'Good Afternoon', 'Good Evening'];
    expect(timeOfDayGreeting()).toContain(options);
  });
});
