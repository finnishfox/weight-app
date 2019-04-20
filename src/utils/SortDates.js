import moment from "moment";

export const sortDates = (a, b) =>{
    if(moment(a).isSame(moment(b))){
        return 0;
    }
    else if(moment(a).isBefore(moment(b))){
        return -1;
    }
    return 1;
};