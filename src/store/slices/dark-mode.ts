import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type DarkModeState = {
  mode: string;
};

const initialState: DarkModeState = {
  mode: 'light',
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    },
  },
});

export const {setMode} = darkModeSlice.actions;

export default darkModeSlice.reducer;
