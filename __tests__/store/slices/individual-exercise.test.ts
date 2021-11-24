import reducer, {
  setBeginExercise,
} from '../../../src/store/slices/individual-exercise';

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    hasBegun: false,
    startCountdown: false,
  });
});
