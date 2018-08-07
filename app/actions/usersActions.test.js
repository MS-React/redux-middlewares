import {
  createUser,
  getUsers,
  selectUser,
  updateUser,
  deleteUser
} from './usersActions';
import * as userService from '../services/userService';
import {
  DEFAULT_PAGINATION_QUERY
} from '../constants';
import { USERS } from '../actions/actionTypes';

jest.mock('../services/userService', () => {
  return {
    fetchUsers: jest.fn(),
    createUsers: jest.fn(),
    deleteUsers: jest.fn(),
    updateUsers: jest.fn(),
    selectUsers: jest.fn(),
  };
});

describe('usersActions', () => {
  describe('WHEN service success', () => {
    describe('getUsers', () => {
      it('should create an action for get users', () => {
        // Act
        const response = getUsers();

        // Assert
        expect(userService.fetchUsers).toHaveBeenCalledWith(DEFAULT_PAGINATION_QUERY);
        expect(response).toEqual(expect.objectContaining({
          type: USERS.GET_ALL
        }));
      });
    });

    describe('createUser', () => {
      it('should create an action for create users', () => {
        // Arrange
        const userData = {};

        // Act
        const response = createUser(userData);

        // Assert
        expect(userService.createUsers).toHaveBeenCalledWith(userData);
        expect(response).toEqual(expect.objectContaining({
          type: USERS.CREATE
        }));
      });
    });

    describe('deleteUser', () => {
      it('should create an action for delete users', () => {
        // Arrange
        const user = { _id: 'user-id-1' };

        // Act
        const response = deleteUser(user);

        // Assert
        expect(userService.deleteUsers).toHaveBeenCalledWith('user-id-1');
        expect(response).toEqual(expect.objectContaining({
          type: USERS.DELETE
        }));
      });
    });

    describe('updateUser', () => {
      it('should create an action for update users', () => {
        // Arrange
        const user = { _id: 'user-id-2' };

        // Act
        const response = updateUser(user);

        // Assert
        expect(userService.updateUsers).toHaveBeenCalledWith('user-id-2', user);
        expect(response).toEqual(expect.objectContaining({
          type: USERS.UPDATE
        }));
      });
    });

    it('should create an action for select user', () => {
      // Arrange
      const user = { _id: 'user-id-2' };

      // Act
      const response = selectUser(user);

      // Assert
      expect(response).toEqual(expect.objectContaining({
        type: USERS.SELECT
      }));
    });
  });
});
