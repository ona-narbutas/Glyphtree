import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user_id: Number | null;
  username: String | null;
  signedIn: Boolean;
}

const initialState: UserState = {
  user_id: null,
  username: null,
  signedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      state.user_id = action.payload.user_id;
      state.username = action.payload.username;
      state.signedIn = action.payload.signedIn;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
