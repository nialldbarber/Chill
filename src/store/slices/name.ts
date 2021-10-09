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
    setName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
  },
});

export const {setName} = nameSlice.actions;

export default nameSlice.reducer;
