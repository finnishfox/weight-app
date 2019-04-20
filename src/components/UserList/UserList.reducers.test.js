import users, {defaultState} from './UserList.reducers';
import {startLoading,userListSet, stopLoading} from './UserList.actions';
import userList,{page2} from "./UserList.mock";





describe('user list reducer', () => {
    it('should return initial state', () => {
        expect(users(undefined, {})).toEqual(defaultState);
    });

    it('set flag isFetching when request users', () => {
        expect(users(undefined, startLoading())).toEqual({...defaultState, isFetching: true});
    });

    it('set flag isFetching to false when request users fails', () => {
        expect(users({...defaultState, isFetching: true}, stopLoading())).toEqual({...defaultState, isFetching: false});
    });

    it('should add users to store', () => {
        expect(users(undefined, userListSet({users: userList.data, usersTotal: userList.total})))
            .toEqual({...defaultState, usersTotal: userList.total, users: userList.data});
    });

    it('should add users to store when 2nd page requested', () => {
        expect(users({...defaultState,usersTotal: userList.total, users: userList.data},
            userListSet({users: page2.data, usersTotal: page2.total})))
            .toEqual({...defaultState, usersTotal: page2.total, users: [...userList.data,...page2.data]});
    });
});