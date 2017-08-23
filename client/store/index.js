import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import slide from './slide';
import user from './user';
import userDeckList from './userDeckList';
import deck from './deck';
import showNavBar from './showNavBar';
import chat from './chat';

const reducer = combineReducers({ slide, user, userDeckList, deck, showNavBar, chat });
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }));
const store = createStore(reducer, composeWithDevTools(middleware));

export default store;
export * from './slide';
export * from './user';
export * from './userDeckList';
export * from './deck';
export * from './showNavBar';
export * from './chat';