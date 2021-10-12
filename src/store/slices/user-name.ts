import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface NameState {
  firstName: string;
}

const initialState: NameState = {
  firstName: '',
};

export const nameSlice = createSlice({
  name: 'name',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
  },
});

export const {setUserName} = nameSlice.actions;

export default nameSlice.reducer;
