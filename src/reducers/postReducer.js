import * as types from '../actions/actionTypes'

const initialState = {
  newPost: '',
  textEntry: '',
  feed: {},
  parentId: ''
};

function postReducer (state = initialState, action) {
  switch (action.type) {
    case types.NEW_POST:
      return Object.assign({}, state, {
        newPost: action.payload,
        textEntry: ''
      });
    case types.ENTER_TEXT:
      console.log('current state: ', state.textEntry)
      return Object.assign({}, state, {textEntry: action.payload});
    case types.FEED:
      return Object.assign({}, state, {feed: action.payload})
    case types.CONTINUE_TEXT:
      console.log('CONTINUE_TEXT case reducer fired with payload: ', action.payload)
      return Object.assign({}, state, {
        parentId: action.payload,
        textEntry: ''
      })
    default:
      return state;
  }
}

export default postReducer;