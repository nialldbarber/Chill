import {configureStore} from '@reduxjs/toolkit';
import exerciseReducer from './slices/exercises';
import nameReducer from './slices/name';

export const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
    name: nameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
