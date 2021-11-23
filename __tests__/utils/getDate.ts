import {timeOfDayGreeting} from '../../src/utils/getDate';

function timeOfDay(): number {
  const today = new Date();
  const hours = today.getHours();
  return hours;
}

describe('timeOfDayGreeting()', () => {
  const options = ['Good Morning', 'Good Afternoon', 'Good Evening'];

  const getTimeOfDay = timeOfDay();

  it('should return greeting depending on time of day', () => {
    if (getTimeOfDay > 0 && getTimeOfDay < 12) {
      expect(timeOfDayGreeting()).toBe(options[0]);
    } else if (getTimeOfDay > 12 && getTimeOfDay < 18) {
      expect(timeOfDayGreeting()).toBe(options[1]);
    } else {
      expect(timeOfDayGreeting()).toBe(options[2]);
    }
  });
});
