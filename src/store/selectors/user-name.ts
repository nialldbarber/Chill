import type {RootState} from '~/store/index';

export const selectName = (state: RootState) => state.name.firstName;
