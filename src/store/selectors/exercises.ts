import {RootState} from '~/store/index';

export const selectBadges = (state: RootState) => state.exercises.exerciseList;
