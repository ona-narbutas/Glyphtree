import * as types from './actionTypes.js';
import auxFunctions from './auxFunctions.js';

export const newPostActionCreator = (postContent) => ({
  type: types.NEW_POST,
  payload: postContent,
})

export const enterTextActionCreator = (textEntry) => ({
  type: types.ENTER_TEXT,
  payload: textEntry
})

// export const savePost = function (postContent) {
//   return function() {
//     dispatch(savePostRequest())
//     fetch('/savedRoots', {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({content: textEntry})
//     }).then(response => {
//       response.json()
//     }).then(data => {
//       dispatch(savePostSuccess(data))
//     }).catch(error => {
//       dispatch(savePostFailure(error))
//     })
//   }
// }
// export const savePostRequest = () => {
//   return {
//     type: types.SAVE_POST_REQUEST
//   }
// }

// export const savePostSuccess = (data) => {
//   return {
//     type: types.SAVE_POST_SUCCESS,
//     payload: data
//   }
// }

// export const savePostFailure = (error) => {
//   return {
//     type: types.SAVE_POST_FAILURE,
//     payload: error
//   }
// }
