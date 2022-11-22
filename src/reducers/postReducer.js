import * as types from '../actions/actionTypes'

const initialState = {newPost: ''};

function postReducer (state = initialState, action) {
  switch (action.type) {
    case types.NEW_POST:
      return Object.assign({}, state, {newPost: action.payload});
    default:
      return state;
  }
}

export default postReducer;