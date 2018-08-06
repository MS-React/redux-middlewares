import { USERS } from '../actions/actionTypes';
import { getUserId } from '../utils/user';
import { PROMISE_SUFFIXES } from '../constants';

const [PENDING, FULFILLED, REJECTED] = PROMISE_SUFFIXES;

export const initialState = {
  data: [],
  selectedUser: {},
  fetch: {
    loading: false,
    error: null
  }
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case `${USERS.CREATE} ${PENDING}`: // pending
    case `${USERS.GET_ALL} ${PENDING}`: // pending
    case `${USERS.DELETE} ${PENDING}`: // pending
      return {
        ...state,
        fetch: {
          loading: true,
          error: null
        }
      };
    case `${USERS.GET_ALL} ${FULFILLED}`: // fulfilled
      return {
        ...state,
        data: action.payload.data.docs,
        fetch: {
          ...state.fetch,
          loading: false,
          error: null
        }
      };
    case `${USERS.DELETE} ${FULFILLED}`: // fulfilled
    case `${USERS.CREATE} ${FULFILLED}`: // fulfilled
    case `${USERS.UPDATE} ${FULFILLED}`: // fulfilled
      return {
        ...state,
        fetch: {
          ...state.fetch,
          loading: false,
          error: null
        }
      };
    case USERS.SELECT_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload
      };
    case USERS.UPDATE_SUCCESS:
      return {
        ...state,
        data: [
          action.payload,
          ...state.data.filter(user => getUserId(action.payload) !== getUserId(user))
        ]
      };
    case `${USERS.CREATE} ${REJECTED}`: // rejected
    case `${USERS.DELETE} ${REJECTED}`: // rejected
    case `${USERS.GET_ALL} ${REJECTED}`: // rejected
      return {
        ...state,
        fetch: {
          loading: false,
          error: action.payload.error
        }
      };
    default:
      return state;
  }
}
