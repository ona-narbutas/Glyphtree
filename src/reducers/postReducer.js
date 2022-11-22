import * as types from '../actions/actionTypes'

const initialState = {
  newPost: '',
  textEntry: ''
};

function postReducer (state = initialState, action) {
  switch (action.type) {
    case types.NEW_POST:
      return Object.assign({}, state, {newPost: action.payload});
    case types.ENTER_TEXT:
      return Object.assign({}, state, {textEntry: action.payload};)
    default:
      return state;
  }
}

export default postReducer;