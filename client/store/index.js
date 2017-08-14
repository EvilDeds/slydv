import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import slide from './slide';
import user from './user';
import userDeckList from './userDeckList';

const reducer = combineReducers({ slide, user, userDeckList });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, composeWithDevTools(middleware));

export default store;
export * from './slide';
export * from './user';
export * from './userDeckList'

