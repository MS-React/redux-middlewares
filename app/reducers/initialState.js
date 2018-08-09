import { initialState as users } from './usersReducer';

export default {
  routing: null,
  users: {
    ...users,
    fetch: {
      ...users.fetch
    }
  }
};
