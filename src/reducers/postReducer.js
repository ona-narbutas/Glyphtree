const initialState = {newPost: ''};

function postReducer (state = initialState, action) {
  switch (action.type) {
    case 'NEW_POST':
      return Object.assign({}, state, {newPost: action.payload});
    default:
      return state;
  }
}

export default postReducer;