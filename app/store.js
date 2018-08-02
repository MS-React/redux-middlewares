import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers/rootReducer';
import { PROMISE_SUFFIXES } from './constants';

export const history = createHistory();

const middlewares = [
  routerMiddleware(history),
  thunkMiddleware,
  promiseMiddleware({
    promiseTypeDelimiter: ' ',
    promiseTypeSuffixes: PROMISE_SUFFIXES
  })
];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

  middlewares.push(logger);
}


export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ...middlewares
    )
  )
);
