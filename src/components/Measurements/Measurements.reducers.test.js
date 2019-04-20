import measurements, {defaultState} from './Measurements.reducers';
import {addMeasurement, deleteMeasurement, deleteAllMeasurements} from "./Measurements.actions";


describe('measurements reducer', () => {
    it('should return initial state', () => {
        expect(measurements(undefined, {})).toEqual(defaultState);
    });

    it('should add measurement to store', () => {
        const newMeasurement = {
            userId: '1',
            weight: 50,
            date: new Date()
        };
        expect(measurements(undefined, addMeasurement(newMeasurement)))
            .toEqual({...defaultState, measurements: [...defaultState.measurements, newMeasurement]});
    });

    it('should remove measurement from store', () => {
        const newMeasurement = {
            userId: '1',
            weight: 50,
            date: '2019-03-18T13:02:40.707Z'
        };
        expect(measurements({...defaultState, measurements: [...defaultState.measurements, newMeasurement]},
            deleteMeasurement({
                userId: '1',
                date: '2019-03-18T13:02:40.707Z'
            })))
            .toEqual({...defaultState, measurements: []});
    });

    it('should remove all measurements from store', () => {
        const allMeasurements = [{
            userId: '1',
            weight: 50,
            date: '2019-03-18T13:02:40.707Z'
        }, {
            userId: '2',
            weight: 70,
            date: '2019-03-18T13:02:40.707Z'
        }];
        expect(measurements({...defaultState, measurements: allMeasurements},
            deleteAllMeasurements({
                userId: '1'
            })))
            .toEqual({
                ...defaultState, measurements: [{
                    userId: '2',
                    weight: 70,
                    date: '2019-03-18T13:02:40.707Z'
                }]
            });
    });
});