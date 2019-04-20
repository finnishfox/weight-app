import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {sortDates} from "../../utils/SortDates";

/**
 * Creates a new dialog to add measurement.
 * @namespace AddMeasurementDialog
 * @class AddMeasurementDialog
 */
class AddMeasurementDialog extends Component {
    state = {
        weight: '',
        date: moment().format("YYYY-MM-DD[T]HH:mm:ss"),
        lostMuchWeight: false,
        lostMuchWeightDialogShown: false
    };

    /** @function handleClose
     * closes dialog
     * @memberof AddMeasurementDialog#
     */
    handleClose = () => {
        const {toggleMeasurementDialog} = this.props;
        toggleMeasurementDialog(false);
        this.setState({weight: ''});
    };

    /** @function addMeasurement
     * adds new measurement
     * @memberof AddMeasurementDialog#
     */
    addMeasurement = () => {
        const {addMeasurement} = this.props;
        if (this.state.weight !== '' && moment(this.state.date).isBefore(moment())) {

            const newMeasurement = {
                userId: this.props.match.params.id,
                weight: this.state.weight,
                date: moment(this.state.date)
            };

            addMeasurement(newMeasurement);
            if (this.checkLostMuchWeight(newMeasurement)) {
                this.setState({lostMuchWeight: true});
            }
            this.setState({weight: ''});
        }
    };

    /** @function checkLostMuchWeight
     * checks if user has lost 5kgs or more since first entry
     * @memberof AddMeasurementDialog#
     * @param obj - measurement object
     * @param {string} obj.userId - id of user.
     * @param {string} obj.weight - weight of user.
     * @param {Date} obj.date - date of measurement.
     */
    checkLostMuchWeight = (obj) => {
        const {measurements} = this.props;
        const allMeasurements = [...measurements, obj].sort((a, b) => sortDates(a.date, b.date));
        if (allMeasurements.length === 0) {
            return false;
        }

        return parseInt(allMeasurements[0].weight, 10) - parseInt(obj.weight, 10) >= 5;
    };

    /** @function onWeightChange
     * updates weight in state
     * @memberof AddMeasurementDialog#
     * @param event
     */
    onWeightChange = (event) => {
        this.setState({weight: event.currentTarget.value});
    };

    /** @function onDateChange
     * updates date in state
     * @memberof AddMeasurementDialog#
     * @param event
     */
    onDateChange = (event) => {
        this.setState({date: event.currentTarget.value});
    };


    render() {
        const inputProps = {
            max: moment().format('YYYY-MM-DD'),
        };

        const disabled = (this.state.weight === '' ||
            this.state.weight < 1 || moment(this.state.date).isAfter(moment()));

        const {addingMeasurement} = this.props;

        return (
            <>
                <Dialog
                    open={addingMeasurement}
                    onClose={this.handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add new measurement
                        </DialogContentText>
                        <TextField
                            autoFocus
                            label="Weight(kg)"
                            value={this.state.weight}
                            onChange={this.onWeightChange}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            type="number"/>
                        <TextField
                            label="Date"
                            type="datetime-local"
                            onChange={this.onDateChange}
                            defaultValue={moment().format("YYYY-MM-DD[T]HH:mm:ss")}
                            inputProps={inputProps}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}
                                color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.addMeasurement()}
                                color="primary"
                                disabled={disabled}>
                            Add measurement
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={this.state.lostMuchWeight && !this.state.lostMuchWeightDialogShown}>
                    <DialogTitle>Way to go! You've lost 5 kgs!</DialogTitle>
                    <Button onClick={() => this.setState({lostMuchWeight: false, lostMuchWeightDialogShown: true})}
                            color="primary">
                        Close
                    </Button>
                </Dialog>
            </>
        );
    }
}

export default AddMeasurementDialog;
