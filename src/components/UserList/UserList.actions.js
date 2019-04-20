import axios from 'axios';

/**
 * create action to add users to store
 * @memberof module:UserList
 * @param {object} payload
 * @param {object[]} payload.users
 * @param {number} payload.usersTotal
 * @param {number[]} payload.loadedPages
 * @returns {{type: string, payload: *}}
 */
export const userListSet = payload => ({
    type: 'USER_LIST_SET',
    payload,
});

/**
 * create action to set start of loading of users
 * @memberof module:UserList
 * @returns {{type: string, payload: boolean}}
 */
export const startLoading = () => ({
    type: 'USER_LIST_FETCHING',
    payload: true,
});

/**
 * create action to set stop of loading of users
 * @memberof module:UserList
 * @returns {{type: string, payload: boolean}}
 */
export const stopLoading = () => ({
    type: 'USER_LIST_FETCHING',
    payload: false,
});

/**
 * create action to request users from server
 * @memberof module:UserList
 * @param page - number of requested page
 * @returns {Function} - dispatches stopLoading or startLoading
 */
export const getUsersList = (page) => async dispatch => {
    try {
        dispatch(startLoading());
        const result = await axios.get(`https://reqres.in/api/users?per_page=5&page=${page}`);
        if (result.status !== 200) {
            return dispatch(stopLoading());
        }
        const users = result.data.data;
        const total = result.data.total;
        const action = userListSet({users: users, usersTotal: total, loadedPages: +page});
        dispatch(action);
    } catch (error) {
        return dispatch(stopLoading());
    }
};