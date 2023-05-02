import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import userInputReducer from './slices/userInputSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
    userInput: userInputReducer,
    user: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;