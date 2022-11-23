import * as types from '../actions/actionTypes'

const initialState = {
  newPost: '',
  textEntry: '',
  feed: {}
};

function postReducer (state = initialState, action) {
  switch (action.type) {
    case types.NEW_POST:
      return Object.assign({}, state, {
        newPost: action.payload,
        textEntry: ''
      });
    case types.ENTER_TEXT:
      return Object.assign({}, state, {textEntry: action.payload});
    case types.FEED:
      console.log('FEED reducer fired with payload: ', action.payload)
      return ({}, state, {feed: action.payload})
    default:
      return state;
  }
}

export default postReducer;