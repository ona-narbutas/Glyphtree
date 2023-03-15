import { createAsyncThunk } from "@reduxjs/toolkit";

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