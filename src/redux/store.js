import rootReducer from './rootReducer.js';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * Store and Middlewares
 * 
 */

export const middlewares = [thunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export const store = createStoreWithMiddleware(rootReducer, composeWithDevTools())

export default store;