import addMeasurement, {defaultState} from './AddMeasurementDialog.reducers';
import toggleMeasurementDialog from './AddMeasurementDialog.actions';

describe('add measurement dialog  reducer', () => {
    it('should return initial state', () => {
        expect(addMeasurement(undefined, {addingMeasurement:false})).toEqual(defaultState);
    });

    it('set flag addingMeasurement to true when popup is open', () => {
        expect(addMeasurement(undefined, toggleMeasurementDialog(true))).toEqual({...defaultState, addingMeasurement: true});
    });

    it('set flag addingMeasurement to false when popup is closed', () => {
        expect(addMeasurement({...defaultState,addingMeasurement:true},
            toggleMeasurementDialog(false))).toEqual({...defaultState, addingMeasurement: false});
    });
});