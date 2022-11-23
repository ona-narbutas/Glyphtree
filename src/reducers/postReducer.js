import * as types from '../actions/actionTypes'

const initialState = {
  newPost: '',
  textEntry: '',
  feed: {}
};

function postReducer (state = initialState, action) {
  switch (action.type) {
    // case types.SAVE_POST_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   }
    // case types.SAVE_POST_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     newPost: action.payload,
    //     textEntry: '',
    //     error: ''
    //   }
    // case types.SAVE_POST_FAILURE: 
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload
    //   }
    case types.NEW_POST:
      return Object.assign({}, state, {
        newPost: action.payload,
        textEntry: ''
      });
    case types.ENTER_TEXT:
      return Object.assign({}, state, {textEntry: action.payload});
    case types.FEED:
      return ({}, state, {feed: action.payload})
    default:
      return state;
  }
}

export default postReducer;