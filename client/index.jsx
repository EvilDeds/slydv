/* eslint-env browser */
import React from 'react';
import a11y from 'react-a11y';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import Routes from './routes';
import './socket';
import store from './store';

if (process.env.NODE_ENV !== 'production') a11y(React, { includeSrcNode: true });

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);
