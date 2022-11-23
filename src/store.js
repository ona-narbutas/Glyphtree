import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import reducers from './reducers/index.js';
import { savePost } from './actions/actions.js';

const store = createStore(reducers);
// const store = createStore(reducers, applyMiddleware(thunk));
// store.subscribe(() => { consolelog(store.getState())});
// store.dispatch(savePost());

export default store;