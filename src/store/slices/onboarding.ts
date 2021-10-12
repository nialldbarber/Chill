import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface OnboardingState {
  inputValue: string;
  proceedToHome: boolean;
  showLoader: boolean;
}

const initialState: OnboardingState = {
  inputValue: '',
  proceedToHome: false,
  showLoader: false,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setProceedToHome: (state, action: PayloadAction<boolean>) => {
      state.proceedToHome = action.payload;
    },
    setShowLoader: (state, action: PayloadAction<boolean>) => {
      state.showLoader = action.payload;
    },
  },
});

export const {setInputValue, setProceedToHome, setShowLoader} =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
