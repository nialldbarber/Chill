import {configureStore} from '@reduxjs/toolkit';

import darkModeReducer from '~/store/slices/dark-mode';
import exerciseReducer from '~/store/slices/exercises';
import individualExerciseReducer from '~/store/slices/individual-exercise';
import onboardingReducer from '~/store/slices/onboarding';
import nameReducer from '~/store/slices/user-name';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    exercises: exerciseReducer,
    individualExercise: individualExerciseReducer,
    onboarding: onboardingReducer,
    name: nameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
