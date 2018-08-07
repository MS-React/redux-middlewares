import {all, put, takeLatest } from 'redux-saga/effects';
import * as userActions from '../actions/usersActions';
import { USERS } from '../actions/actionTypes';
import { NotificationManager } from 'react-notifications';

function* notifyAndFetchUsers(action) {
  const { type: actionType, payload } = action;
  switch (actionType) {
    case USERS._PROMISE_STATES.UPDATE_FULFILLED:
      NotificationManager.success( `User ${payload.data.name} updated successfully`);
      break;
    case USERS._PROMISE_STATES.DELETE_FULFILLED:
      NotificationManager.success( `User ${payload.data.name} deleted successfully`);
      break;
    case USERS._PROMISE_STATES.CREATE_FULFILLED:
      NotificationManager.success( `User ${payload.data.name} created successfully`);
      break;
  }
  yield put(userActions.getUsers());
}

function* refreshUsersListSage() {
  yield takeLatest([
    USERS._PROMISE_STATES.CREATE_FULFILLED,
    USERS._PROMISE_STATES.UPDATE_FULFILLED,
    USERS._PROMISE_STATES.DELETE_FULFILLED],
  notifyAndFetchUsers);
}

export default function* rootSaga() {
  yield all([
    refreshUsersListSage(),
  ]);
}
