export const defaultState = {
    isFetching: false,
    users: [],
    usersTotal:0,
    loadedPages:[]
};

export default function users(initialState = defaultState, action) {
    switch (action.type) {
        case "USER_LIST_SET":
            return {
                isFetching: false,
                users: [
                    ...initialState.users,
                    ...action.payload.users
                ],
                loadedPages: [
                    ...initialState.loadedPages,
                    action.payload.loadedPages
                ].sort(),
                usersTotal: action.payload.usersTotal
            };
        case "USER_LIST_FETCHING":
            return {
                ...initialState,
                isFetching: action.payload,
            };
        default:
            return initialState;
    }
}