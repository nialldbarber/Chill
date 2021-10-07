import {RootState} from '../index';

export const selectBadges = (state: RootState) => state.exercises.exerciseList;
