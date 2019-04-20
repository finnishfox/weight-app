import {sortDates} from "../../utils/SortDates";

export const getMeasurements = (state, id) => (
    [...state.measurements.measurements
        .filter(item => item.userId === id)]
        .sort((a,b)=>sortDates(a.date,b.date)));