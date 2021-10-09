import {configureStore} from '@reduxjs/toolkit';

import exerciseReducer from '~/store/slices/exercises';
import nameReducer from '~/store/slices/name';

export const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
    name: nameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
