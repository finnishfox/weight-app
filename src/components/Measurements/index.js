import {getMeasurements} from './Measurements.selectors';
import { connect } from 'react-redux';
import Measurements from "./Measurements";
import {deleteMeasurement,deleteAllMeasurements} from './Measurements.actions';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = (state, props) => ({
    measurements: getMeasurements(state, props.userId),
    measurementsTotal: getMeasurements(state, props.userId).length
});


const styles = theme => ({
    button: {
        marginRight: theme.spacing.unit,
    },
});

const mapDispatchToProps = {
    deleteMeasurement,
    deleteAllMeasurements
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Measurements));

