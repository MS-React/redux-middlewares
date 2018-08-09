import { all, put, takeLatest } from 'redux-saga/effects';
import * as userSaga from './usersSaga';
import * as userActions from '../actions/usersActions';
import { USERS } from '../actions/actionTypes';

import { NotificationManager } from 'react-notifications';

jest.mock('react-notifications', () => {
  return {
    NotificationManager: {
      success: jest.fn()
    }
  };
});

describe('userSaga', () => {
  let gen;

  describe('notifyAndFetchUsers', () => {
    it('should send a notify with UPDATE_FULFILLED and update users in the store', () => {
      gen = userSaga.notifyAndFetchUsers({
        type: USERS._PROMISE_STATES.UPDATE_FULFILLED,
        payload: {
          data: {
            name: 'John'
          }
        }
      });

      expect(gen.next().value).toEqual(put(userActions.getUsers()));
      expect(NotificationManager.success).toHaveBeenCalledWith('User John updated successfully');
    });

    it('should send a notify with DELETE_FULFILLED and update users in the store', () => {
      gen = userSaga.notifyAndFetchUsers({
        type: USERS._PROMISE_STATES.DELETE_FULFILLED,
        payload: {
          data: {
            name: 'John'
          }
        }
      });

      expect(gen.next().value).toEqual(put(userActions.getUsers()));
      expect(NotificationManager.success).toHaveBeenCalledWith('User John deleted successfully');
    });

    it('should send a notify with CREATE_FULFILLED and update users in the store', () => {
      gen = userSaga.notifyAndFetchUsers({
        type: USERS._PROMISE_STATES.CREATE_FULFILLED,
        payload: {
          data: {
            name: 'John'
          }
        }
      });

      expect(gen.next().value).toEqual(put(userActions.getUsers()));
      expect(NotificationManager.success).toHaveBeenCalledWith('User John created successfully');
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('refreshUsersListSage', () => {
    it('should refresh the users list', () => {
      gen = userSaga.refreshUsersListSage();
      expect(gen.next().value).toEqual(takeLatest(
        [
          USERS._PROMISE_STATES.CREATE_FULFILLED,
          USERS._PROMISE_STATES.UPDATE_FULFILLED,
          USERS._PROMISE_STATES.DELETE_FULFILLED],
        userSaga.notifyAndFetchUsers));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('rootSaga', () => {
    it('should return all registered sagas', () => {
      gen = userSaga.default();

      expect(gen.next().value).toEqual(all([
        userSaga.refreshUsersListSage(),
      ]));

      expect(gen.next().done).toBeTruthy();
    });
  });
});
