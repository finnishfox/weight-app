export const defaultState = {
    measurements:[],
};


export default function measurements(initialState = defaultState, action) {
    switch (action.type) {
        case "ADD_MEASUREMENT":
            return {
                measurements: [
                    ...initialState.measurements,
                    action.payload
                ],
            };
        case "DELETE_MEASUREMENT":
            return {
                measurements: initialState.measurements.filter(item => (item.userId !== action.payload.userId
                    || item.date !== action.payload.date
                ))
            };
        case 'DELETE_ALL_MEASUREMENTS':
            return {
                measurements: initialState.measurements.filter(item =>
                    (item.userId !== action.payload.userId))
            };
        default:
            return initialState;
    }
}