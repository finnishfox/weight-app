import {defaultState} from "./AddMeasurementDialog.reducers";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import toggleMeasurementDialog from "./AddMeasurementDialog.actions";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('add measurement dialog actions', () => {
    it('will change addingMeasurement flag', async () => {
        const store = mockStore(defaultState);
        await store.dispatch(toggleMeasurementDialog(true));
        const expectedActions = [toggleMeasurementDialog(true)];
        expect(store.getActions()).toEqual(expectedActions);
    });
});