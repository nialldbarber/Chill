import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CONFIG, ConfigT} from '../../constants/ exercises';

export interface ExerciseState {
  exerciseList: Array<ConfigT>;
  originalList: Array<ConfigT>;
}

const initialState: ExerciseState = {
  exerciseList: CONFIG,
  originalList: CONFIG,
};

export const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    filterBySelectedBadge: (state, action: PayloadAction<string>) => {
      state.exerciseList = state.originalList;
      state.exerciseList = state.exerciseList.filter((item) => {
        return item?.tags?.includes(action.payload);
      });
    },
  },
});

export const {filterBySelectedBadge} = exerciseSlice.actions;

export default exerciseSlice.reducer;
