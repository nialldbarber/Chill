import {RootState} from '~/store/index';

export const selectDarkMode = (state: RootState) => state.darkMode.darkMode;
