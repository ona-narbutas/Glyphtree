import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Post } from '../../types';

export const fetchHomeFeed = createAsyncThunk(
  'post/fetchHomeFeedStatus',
  async (arg, thunkAPI) => {
    try {
      const queryRes = await fetch('/api/posts');
      const queryResParsed = await queryRes.json();

      return queryResParsed.feed;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
interface PostState {
  textEntry: string;
  parent_id: number | null;
  is_root: boolean | null;
  feed: Array<Post>;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  savedPost: Post | null;
  selectedPost: Post | null;
}

const initialState: PostState = {
  textEntry: '',
  parent_id: null,
  is_root: null,
  feed: [],
  loading: 'idle',
  savedPost: null,
  selectedPost: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    inputText: (state: PostState, action: PayloadAction<string>) => {
      state.textEntry = action.payload;
    },
    buildFeed: (state: PostState, action: PayloadAction<Post[]>) => {
      state.feed = [...action.payload];
    },
    selectPost: (state: PostState, action: PayloadAction<Post>) => {
      state.selectedPost = { ...action.payload };
    },
    deselectPost: (state: PostState, action: PayloadAction<Post>) => {
      state.selectedPost = null;
    },
    setChildren: (state: PostState, action: PayloadAction<Post[]>) => {
      if (state.selectedPost) {
        state.selectedPost.children = [...action.payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchHomeFeed.fulfilled,
      (state, action: PayloadAction<Array<Post>>) => {
        state.feed = [...action.payload];
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { inputText, buildFeed, selectPost, deselectPost, setChildren } =
  postSlice.actions;

export default postSlice.reducer;
