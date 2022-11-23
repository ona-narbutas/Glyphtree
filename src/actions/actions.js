import * as types from './actionTypes.js';

export const newPostActionCreator = (postContent) => ({
  type: types.NEW_POST,
  payload: postContent
})

export const enterTextActionCreator = (textEntry) => ({
  type: types.ENTER_TEXT,
  payload: textEntry
})