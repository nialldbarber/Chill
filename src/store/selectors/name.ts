import {RootState} from '~/store/index';

export const selectName = (state: RootState) => state.name.firstName;
