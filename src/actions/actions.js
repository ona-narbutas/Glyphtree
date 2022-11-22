import * as types from './actionTypes.js';

export const newPostActionCreator = (postData) => ({
  type: types.NEW_POST,
  payload: postData
})