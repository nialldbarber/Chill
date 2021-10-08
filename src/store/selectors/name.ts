import {RootState} from '../index';

export const selectName = (state: RootState) => state.name.firstName;
