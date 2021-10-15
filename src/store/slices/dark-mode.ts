import {createSlice} from '@reduxjs/toolkit';

type DarkModeState = {
  darkMode: boolean;
};

const initialState: DarkModeState = {
  darkMode: false,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = true;
    },
    setLightMode: (state) => {
      state.darkMode = false;
    },
  },
});

export const {setDarkMode, setLightMode} = darkModeSlice.actions;

export default darkModeSlice.reducer;
