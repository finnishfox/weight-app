import {sortDates} from '../../utils/SortDates';
export const checkIsAdding = state => (state.addMeasurement.addingMeasurement);
export const getMeasurements = (state, id) => {
    return (
        [...state.measurements.measurements
            .filter(item => item.userId === id)]
            .sort((a,b)=>sortDates(a,b))
    );
};