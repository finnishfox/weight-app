import {checkIsAdding, getMeasurements} from './AddMeasurementDialog.selectors';
import { connect } from 'react-redux';
import AddMeasurementDialog from "./AddMeasurementDialog";
import toggleMeasurementDialog from "./AddMeasurementDialog.actions";
import {addMeasurement} from '../Measurements/Measurements.actions';
import { withRouter } from "react-router";

const mapStateToProps = (state, props)  => ({
    addingMeasurement: checkIsAdding(state),
    measurements: getMeasurements(state, props.userId),
});

const mapDispatchToProps = {
    toggleMeasurementDialog,
    addMeasurement
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AddMeasurementDialog));

