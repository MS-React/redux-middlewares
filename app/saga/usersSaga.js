import {all, put, takeLatest } from 'redux-saga/effects';
import * as userActions from '../actions/usersActions';
import { USERS } from '../actions/actionTypes';
import { PROMISE_SUFFIXES } from '../constants';
const [PENDING, FULFILLED, REJECTED] = PROMISE_SUFFIXES;


function* fetchUsers() {
  yield put(userActions.getUsers());
}

function* refreshUsersListSage() {
  yield takeLatest([
    `${USERS.DELETE} ${FULFILLED}`,
    `${USERS.CREATE} ${FULFILLED}`,
    `${USERS.UPDATE} ${FULFILLED}`],
  fetchUsers);
}

export default function* rootSaga() {
  yield all([
    refreshUsersListSage(),
    // watchIncrementAsync()
  ]);
}
