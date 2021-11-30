import type {RootState} from '~/store/index';

export const selectHasBegun = (state: RootState) =>
  state.individualExercise.hasBegun;

export const selectHasCountdownStarted = (state: RootState) =>
  state.individualExercise.startCountdown;
