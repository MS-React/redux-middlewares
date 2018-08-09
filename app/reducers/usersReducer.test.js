import usersReducer, { initialState } from './usersReducer';
import { USERS } from '../actions/actionTypes';

describe('usersReducer', () => {
  it('should be defined', () => {
    expect(usersReducer).toBeDefined();
  });

  it('should be a function', () => {
    expect(usersReducer).toEqual(expect.any(Function));
  });

  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(initialState);
  });

  it('should set loading users to `true` ', () => {
    const action = {
      type: USERS._PROMISE_STATES.CREATE_PENDING
    };
    const expectedState = {
      ...initialState,
      fetch: {
        loading: true,
        error: null
      }
    };

    expect(usersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set loading users to `false`', () => {
    const action = {
      type: USERS._PROMISE_STATES.CREATE_FULFILLED
    };
    const expected = {
      ...initialState,
      fetch: {
        loading: false,
        error: null
      }
    };

    expect(usersReducer(initialState, action)).toEqual(expected);
  });

  it('should set loading users to `false` and set the error', () => {
    const action = {
      type: USERS._PROMISE_STATES.CREATE_REJECTED,
      payload: {
        error: 'foo'
      }
    };
    const expected = {
      ...initialState,
      fetch: {
        loading: false,
        error: 'foo'
      }
    };

    expect(usersReducer(initialState, action)).toEqual(expected);
  });

  it('should load the fetched users into the store', () => {
    const action = {
      type: USERS._PROMISE_STATES.GET_ALL_FULFILLED,
      payload: {
        data: {
          docs: [{
            name: 'John Doe'
          }]
        }
      }
    };
    const expected = {
      ...initialState,
      data: [{
        name: 'John Doe'
      }]
    };

    expect(usersReducer(initialState, action)).toEqual(expected);
  });

  it('should set the selected user in the store', () => {
    const action = {
      type: USERS.SELECT,
      payload: {
        name: 'John Doe'
      }
    };
    const expected = {
      ...initialState,
      selectedUser: {
        name: 'John Doe'
      }
    };

    expect(usersReducer(initialState, action)).toEqual(expected);
  });
});
