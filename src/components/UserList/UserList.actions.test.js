import nock from "nock";
import userList from "./UserList.mock";
import {defaultState} from "./UserList.reducers";
import {getUsersList, startLoading, stopLoading, userListSet} from "./UserList.actions";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('user list actions', () => {
    it('will add users to store', async () => {
        nock('https://reqres.in').defaultReplyHeaders({'access-control-allow-origin': '*'})
            .get('/api/users?per_page=5&page=1').reply(200, userList);
        const store = mockStore(defaultState);
        await store.dispatch(getUsersList(1));
        const expectedActions = [startLoading(), userListSet({users: userList.data, usersTotal: userList.total})];
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('will not add users to store if server fails', async () => {
        nock('https://reqres.in').defaultReplyHeaders({'access-control-allow-origin': '*'})
            .get('/api/users?per_page=5&page=1').reply(500);
        const store = mockStore(defaultState);
        await store.dispatch(getUsersList(1));
        const expectedActions = [startLoading(), stopLoading()];
        expect(store.getActions()).toEqual(expectedActions);
    });
});