import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import users from '../components/UserList/UserList.reducers';
import measurements from '../components/Measurements/Measurements.reducers';
import addMeasurement from '../components/AddMeasurementDialog/AddMeasurementDialog.reducers';
import {combineReducers} from 'redux';

const addons = [applyMiddleware(thunk)];

const reducers = combineReducers({
    users,
    measurements,
    addMeasurement
});


const store = createStore(
    reducers,
    compose(...addons),
);

export default store;