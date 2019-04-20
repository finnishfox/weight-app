export const defaultState = {
    addingMeasurement: false,
};

export default function addMeasurement(initialState = defaultState, action) {
    switch (action.type) {
        case "TOGGLE_MEASUREMENT_DIALOG":
            return {
                addingMeasurement: action.payload,
            };
        default:
            return initialState;
    }
}