import {RootState} from '~/store/index';

export const selectInputValue = (state: RootState) =>
  state.onboarding.inputValue;

export const selectProceedToHome = (state: RootState) =>
  state.onboarding.proceedToHome;

export const selectShowLoader = (state: RootState) =>
  state.onboarding.showLoader;
