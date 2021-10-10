import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IndividualExerciseState {
  hasBegun: boolean;
  startCountdown: boolean;
}

const initialState: IndividualExerciseState = {
  hasBegun: false,
  startCountdown: false,
};

export const individualExerciseSlice = createSlice({
  name: 'individual-exercise',
  initialState,
  reducers: {
    handleBeginExercise: (state, action: PayloadAction<boolean>) => {
      state.hasBegun = action.payload;
    },
    handleStartCountdown: (state, action: PayloadAction<boolean>) => {
      state.startCountdown = action.payload;
    },
  },
});

export const {handleBeginExercise, handleStartCountdown} =
  individualExerciseSlice.actions;

export default individualExerciseSlice.reducer;
