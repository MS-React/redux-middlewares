import { USERS } from '../actions/actionTypes';
import { getUserId } from '../utils/user';

export const initialState = {
  data: [],
  selectedUser: {},
  fetch: {
    loading: false,
    error: null
  }
};

export default function usersReducer(state = initialState, action) {
  switch(action.type) {
    case USERS._PROMISE_STATES.CREATE_PENDING: // pending
    case USERS._PROMISE_STATES.UPDATE_PENDING: // pending
    case USERS._PROMISE_STATES.DELETE_PENDING: // pending
      return {
        ...state,
        fetch: {
          loading: true,
          error: null
        }
      };
    case USERS._PROMISE_STATES.GET_ALL_FULFILLED: // fulfilled
      return {
        ...state,
        data: action.payload.data.docs,
        fetch: {
          ...state.fetch,
          loading: false,
          error: null
        }
      };
    case USERS._PROMISE_STATES.CREATE_FULFILLED: // fulfilled
    case USERS._PROMISE_STATES.UPDATE_FULFILLED: // fulfilled
    case USERS._PROMISE_STATES.DELETE_FULFILLED: // fulfilled
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
    case USERS._PROMISE_STATES.CREATE_REJECTED: // rejected
    case USERS._PROMISE_STATES.UPDATE_REJECTED: // rejected
    case USERS._PROMISE_STATES.DELETE_REJECTED: // rejected
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
