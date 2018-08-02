import createAction from 'redux-actions';
import { omit }from '../utils/functions';
import { USERS } from '../actions/actionTypes';
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

export const getUsers = createAction(USERS.GET_ALL, (queryParams = DEFAULT_PAGINATION_QUERY) => {
  const promise = fetchUsers(queryParams);
  return { promise };
});

/* export const createUsersSuccess = user => ({
  type: USERS.CREATE_SUCCESS,
  payload: user
});

export const selectUsersSuccess = user => ({
  type: USERS.SELECT_SUCCESS,
  payload: user
});

export const getUsersSuccess = (usersData) => ({
  type: USERS.GET_ALL_SUCCESS,
  payload: { ...usersData }
});

export const updateUsersSuccess = user => ({
  type: USERS.UPDATE_SUCCESS,
  payload: user
});

export const deleteUsersSuccess = user => ({
  type: USERS.DELETE_SUCCESS,
  payload: user
}); */

export function selectUser(user) {
  return dispatch => {
    return new Promise(resolve => {
      dispatch(selectUsersSuccess(user));
      resolve(user);
    });
  };
}

export function deleteUser(user) {
  return dispatch => {
    dispatch(loadingUsersBegin());
    return deleteUsers(getUserId(user))
      .then(() => {
        dispatch(loadingUsersComplete());
        dispatch(deleteUsersSuccess(user));
        return user;
      })
      .catch((error) => handleErrors(error, dispatch));
  };
}

export function updateUser(user) {
  return dispatch => {
    dispatch(loadingUsersBegin());
    return updateUsers(getUserId(user), omit(user, DEFAULT_USER_VALID_ID_PATHS))
      .then(({ data }) => {
        dispatch(loadingUsersComplete());
        dispatch(updateUsersSuccess(data));
        return data;
      })
      .catch((error) => handleErrors(error, dispatch));
  };
}

export function createUser(userData) {
  return dispatch => {
    dispatch(loadingUsersBegin());
    return createUsers(omit(userData, DEFAULT_USER_VALID_ID_PATHS))
      .then(({ data }) => {
        dispatch(loadingUsersComplete());
        dispatch(createUsersSuccess(data));
        return data;
      })
      .catch((error) => handleErrors(error, dispatch));
  };
}

/* export function getUsers(queryParams = DEFAULT_PAGINATION_QUERY) {
  return dispatch => {
    dispatch(loadingUsersBegin());
    return fetchUsers(queryParams)
      .then(({ data }) => {
        const usersPayload = {
          ...omit(data, ['docs']),
          users: data.docs
        };
        dispatch(loadingUsersComplete());
        dispatch(getUsersSuccess(usersPayload));
        return usersPayload;
      })
      .catch((error) => handleErrors(error, dispatch));
  };
} */

function handleErrors(error, dispatch) {
  errorService.logErrors('action failed', 'userActions.js');
  // dispatch(loadingUsersFailed(error));
}
