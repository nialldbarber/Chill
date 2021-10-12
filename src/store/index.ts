import {configureStore} from '@reduxjs/toolkit';

import exerciseReducer from '~/store/slices/exercises';
import individualExerciseReducer from '~/store/slices/individual-exercise';
import onboardingReducer from '~/store/slices/onboarding';
import nameReducer from '~/store/slices/user-name';

export const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
    individualExercise: individualExerciseReducer,
    name: nameReducer,
    onboarding: onboardingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
