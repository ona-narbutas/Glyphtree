import * as types from '../actions/actionTypes'

const initialState = {
  newPost: '',
  textEntry: ''
};

function postReducer (state = initialState, action) {
  switch (action.type) {
    case types.NEW_POST:
      console.log('updating newPost state to: ', action.payload)
      return Object.assign({}, state, {newPost: action.payload});
    case types.ENTER_TEXT:
      console.log('ENTER_TEXT reducer fired')
      console.log('state.textEntry: ', state.textEntry)
      return Object.assign({}, state, {textEntry: action.payload});
    default:
      return state;
  }
}

export default postReducer;