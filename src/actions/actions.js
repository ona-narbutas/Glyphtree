import * as types from './actionTypes.js';

export const newPostActionCreator = (postData) => ({
  type: types.NEW_POST,
  payload: postData
})

export const enterTextActionCreator = (textEntry) => ({
  type: types.ENTER_TEXT,
  payload: textEntry
})