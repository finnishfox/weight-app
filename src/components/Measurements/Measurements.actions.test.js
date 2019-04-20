import {defaultState} from "./Measurements.reducers";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {addMeasurement,deleteMeasurement,deleteAllMeasurements} from "./Measurements.actions";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('measurements actions', () => {
    it('will add measurement to store', async () => {
        const store = mockStore(defaultState);
        const newMeasurement = {
            userId: '1',
            weight: 50,
            date: new Date()
        };
        await store.dispatch(addMeasurement(newMeasurement));
        const expectedActions = [addMeasurement(newMeasurement)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('will remove measurement from store', async () => {
        const measurement = {
            userId: '1',
            date: new Date()
        };
        const store = mockStore(defaultState);
        await store.dispatch(deleteMeasurement(measurement));
        const expectedActions = [deleteMeasurement(measurement)];
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('will remove all measurements from store', async () => {
        const store = mockStore(defaultState);
        await store.dispatch(deleteAllMeasurements({userId:'1'}));
        const expectedActions = [deleteAllMeasurements({userId:'1'})];
        expect(store.getActions()).toEqual(expectedActions);
    });
});