import { createAction } from 'redux-actions';
import { identity, omit }from '../utils/functions';
import { USERS } from './actionTypes';
import {
  createUsers,
  deleteUsers,
  fetchUsers,
  updateUsers
} from '../services/userService';
import {
  DEFAULT_USER_VALID_ID_PATHS,
  DEFAULT_PAGINATION_QUERY
} from '../constants';
import { getUserId } from '../utils/user';

export const getUsers = createAction(USERS.GET_ALL, (queryParams = DEFAULT_PAGINATION_QUERY) => (
  {
    promise: fetchUsers(queryParams)
  }
), identity);

export const createUser = createAction(USERS.CREATE, (userData) => (
  {
    promise: createUsers(omit(userData, DEFAULT_USER_VALID_ID_PATHS))
  }
), identity);

export const deleteUser = createAction(USERS.DELETE, (user) => (
  {
    promise: deleteUsers(getUserId(user))
  }
), identity);

export const updateUser = createAction(USERS.UPDATE, (user) => (
  {
    promise: updateUsers(getUserId(user), omit(user, DEFAULT_USER_VALID_ID_PATHS))
  }
), identity);

export const selectUsersSuccess = user => ({
  type: USERS.SELECT_SUCCESS,
  payload: user
});

export function selectUser(user) {
  return dispatch => {
    return new Promise(resolve => {
      dispatch(selectUsersSuccess(user));
      resolve(user);
    });
  };
}
