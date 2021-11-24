import reducer, {setBeginExercise} from '~/store/slices/individual-exercise';

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    hasBegun: false,
    startCountdown: false,
  });
});
