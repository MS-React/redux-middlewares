import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers/rootReducer';
import { PROMISE_SUFFIXES } from './constants';
import rootSaga from './saga/usersSaga';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  routerMiddleware(history),
  thunkMiddleware,
  promiseMiddleware({
    promiseTypeDelimiter: ' ',
    promiseTypeSuffixes: PROMISE_SUFFIXES
  }),
  sagaMiddleware
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

sagaMiddleware.run(rootSaga);
