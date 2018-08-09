import { PROMISE_SUFFIXES } from '../constants';
const [PENDING, FULFILLED, REJECTED] = PROMISE_SUFFIXES;

const USER_ACTIONS = {
  GET_ALL: '[users] Get all',
  CREATE: '[users] Create',
  DELETE: '[users] Delete',
  UPDATE: '[users] Update',
  SELECT: '[users] Select'
};

const _PROMISE_STATES = {
  CREATE_PENDING: `${USER_ACTIONS.CREATE} ${PENDING}`,
  CREATE_FULFILLED: `${USER_ACTIONS.CREATE} ${FULFILLED}`,
  CREATE_REJECTED: `${USER_ACTIONS.CREATE} ${REJECTED}`,
  UPDATE_PENDING: `${USER_ACTIONS.UPDATE} ${PENDING}`,
  UPDATE_FULFILLED: `${USER_ACTIONS.UPDATE} ${FULFILLED}`,
  UPDATE_REJECTED: `${USER_ACTIONS.UPDATE} ${REJECTED}`,
  DELETE_PENDING: `${USER_ACTIONS.DELETE} ${PENDING}`,
  DELETE_FULFILLED: `${USER_ACTIONS.DELETE} ${FULFILLED}`,
  DELETE_REJECTED: `${USER_ACTIONS.DELETE} ${REJECTED}`,
  GET_ALL_PENDING: `${USER_ACTIONS.GET_ALL} ${PENDING}`,
  GET_ALL_FULFILLED: `${USER_ACTIONS.GET_ALL} ${FULFILLED}`,
  GET_ALL_REJECTED: `${USER_ACTIONS.GET_ALL} ${REJECTED}`
};

export const USERS = ({
  ...USER_ACTIONS,
  _PROMISE_STATES
});
