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
    setBeginExercise: (state, action: PayloadAction<boolean>) => {
      state.hasBegun = action.payload;
    },
    setStartCountdown: (state, action: PayloadAction<boolean>) => {
      state.startCountdown = action.payload;
    },
  },
});

export const {setBeginExercise, setStartCountdown} =
  individualExerciseSlice.actions;

export default individualExerciseSlice.reducer;
