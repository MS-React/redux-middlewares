# Redux Middlewares

Sample integration of redux middlewares such as: redux-saga, promise-middleware, thunk-middleware, redux-logger.

## Middleware in a brief

A middleware is a hook in the middle of a Process that modifies the way the process is done.
As we can imagine through an analogy of a Request <---> Response in a Server <--> Client model, when a user does a Request to the Server, the server must process it and return a Response to the client.
By applying middlewares in this scenario, the flow in this case will be something like, the client does a Request to the Server, then calls the middlewares that consumes the request and if needed modifies it adding or updating attributes and calls the next middleware with the modified request object until the last middleware in the chain who will trigger the actual process requested by the client to send the Response.

## Redux Middleware
In case of Redux, the middleware concept is the same, but actual where this middleware applies is between the Action being dispatched and the moment it reaches the reducer for being called that will modify the state of our store.

# Redux Thunk

## What is a thunk in a brief

A thunk is a function that -- without any parameters -- is wired to call another function.
In other words, you wrap a function definition around function call -- with any paremeters it needs -- to defer the execution of that call, and that wrapping function is a thunk. When you later execute the thunk, you end up calling the original function.

#### Example of a thunk:

```javascript
function foo(x,y) {
	return x + y;
}

function fooThunk() {
	return foo( 3, 4 );
}

// later
console.log( fooThunk() );	// 7
```

Given that said, Redux Thunk is a package of redux that implement this pattern and by using this specific middlewar, an action creator can return a function instead of an action object. This way, the action creator becomes a Thunk. 

### Setup the Redux Thunk package

**To enable Redux Thunk, use `applyMiddleware` (Asynchronous)**

**index.js**
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

**actions.js**
```javascript
function fetchSecretSauce() {
  return fetch('https://www.google.com/search?q=secret+sauce');
}

// These are the normal action creators you have seen so far.
// The actions they return can be dispatched without any middleware.
// However, they only express “facts” and not the “async flow”.

function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce
  };
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error
  };
}

function withdrawMoney(amount) {
  return {
    type: 'WITHDRAW',
    amount
  };
}

// Even without middleware, you can dispatch an action:
store.dispatch(withdrawMoney(100));

// But what do you do when you need to start an asynchronous action,
// such as an API call, or a router transition?

// Meet thunks.
// A thunk is a function that returns a function.
// This is a thunk.

function makeASandwichWithSecretSauce(forPerson) {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatch) {
    return fetchSecretSauce().then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
}

// Thunk middleware lets me dispatch thunk async actions
// as if they were actions!

store.dispatch(
  makeASandwichWithSecretSauce('Me')
);
```

**Reference Documentation**: https://github.com/reduxjs/redux-thunk

# Redux Saga

A Saga is a library that aims to make application side effects easer to manage, more efficient to eecute, easy to test, and better at handling failures.
The mental model is that a saga is like a separate thread in your application thi's solely responsible for side effects. a *redux-saga* is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

This Saga uses an ES6 feature called Generator to make those async flow easy to read, write and test. By doing so, these async flows look like your standard synchronous JS code.

### **main.js**

```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)

// render the application
```

### **sagas.js**

```javascript
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```

**Reference Documentation**: https://github.com/redux-saga/redux-saga

# Redux Promise

Redux Promise Middleware enables simple, yet robust handling of async action creators in Redux.

```javascript
const asyncAction = () => ({
  type: 'PROMISE',
  payload: new Promise(...),
})
```

Given a single action with an async payload, the middleware transforms the action to a separate a pending action and a separate fulfilled/rejected action, representing the states of the async action.

**Reference Documentation**: https://github.com/pburtchaell/redux-promise-middleware

# Redux-Logger

This middleware is useful for development which allows you to have a deep view of what's going on in the state of your application in a given moment, by knowing what changes has been requested and what happend when that change has performed.

## Usage

```javascript
import { applyMiddleware, createStore } from 'redux';
 
// Logger with default options
import logger from 'redux-logger'
const store = createStore(
  reducer,
  applyMiddleware(logger)
);
```

**Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions**

**Reference Documentation**: https://www.npmjs.com/package/redux-logger
