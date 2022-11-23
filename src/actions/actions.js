import * as types from './actionTypes.js';

export const newPostActionCreator = (postContent) => ({
  type: types.NEW_POST,
  payload: postContent,
})

export const enterTextActionCreator = (textEntry) => ({
  type: types.ENTER_TEXT,
  payload: textEntry
})

export const feedActionCreator = (feed) => ({
  type: types.FEED,
  payload: feed
})

export const continueTextActionCreator = (parentId) => ({
  type: types.CONTINUE_TEXT,
  payload: parentId
})

export const submitChildActionCreator = (childData) => ({
  type: types.SUBMIT_CHILD,
  payload: childData
})
