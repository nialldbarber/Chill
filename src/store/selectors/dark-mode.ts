import {RootState} from '~/store/index';

export const selectMode = (state: RootState) => state.mode.mode;
