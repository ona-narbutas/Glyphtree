import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";

import type { Post } from '../../types';

export interface PostState {
  textEntry: string,
  parent_id: (number | null),
  is_root: (boolean | null),
  feed: Array<Post>,
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
};

export const fetchHomeFeed = createAsyncThunk(
  'post/fetchHomeFeedStatus',
  async (arg, thunkAPI) => {
    try {
      const data = await fetch('/posts');
      const feed = await data.json();
      return feed;
    } catch(err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
)

const initialState: PostState = {
  textEntry: '',
  parent_id: null,
  is_root: null,
  feed: [],
  loading: 'idle'
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    inputText: (state, action: PayloadAction<string>) => {
      state.textEntry = action.payload;
    },
    // add reducer to populate feed array with data
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeFeed.fulfilled, (state, action: PayloadAction<Array<Post>>) => {
      state.feed = [...action.payload];
    })
  }
})

// Action creators are generated for each case reducer function
export const { inputText } = postSlice.actions;

export default postSlice.reducer;