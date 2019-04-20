import {sortDates} from "../../utils/SortDates";

export const getMeasurements = (state, id) => {
    return (
        [...state.measurements.measurements
            .filter(item => item.userId === id)]
            .sort((a,b)=>sortDates(b.date,a.date))
    );
};