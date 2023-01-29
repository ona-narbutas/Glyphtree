import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface UserInputState {
  username: string,
  email: string,
  password: string,
};

const initialState: UserInputState = {
  username: '',
  email: '',
  password: '',
}

export const userInputSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    inputUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    inputEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    inputPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  }
});

export const { inputUsername, inputEmail, inputPassword } = userInputSlice.actions;

export default userInputSlice.reducer;