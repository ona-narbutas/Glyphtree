import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../../types';

export interface PostState {
  textEntry: string,
  parent_id: (number | null),
  is_root: (boolean | null),
  feed: Array<Post>,
};

const initialState: PostState = {
  textEntry: '',
  parent_id: null,
  is_root: null,
  feed: [],
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    inputText: (state, action: PayloadAction<string>) => {
      state.textEntry = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { inputText } = postSlice.actions;

export default postSlice.reducer;