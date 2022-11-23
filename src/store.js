import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';

const store = createStore(reducers, applyMiddleware);

export default store;