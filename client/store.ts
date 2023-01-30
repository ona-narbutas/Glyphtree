import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import userInputReducer from './slices/userInputSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
    userInput: userInputReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;