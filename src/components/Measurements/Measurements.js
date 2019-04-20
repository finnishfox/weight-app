import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import AddMeasurementDialog from "../AddMeasurementDialog";
import store from "../../store";
import toggleMeasurementDialog from '../AddMeasurementDialog/AddMeasurementDialog.actions';
import './Measurements.scss';
import IconButton from "@material-ui/core/IconButton/IconButton";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import moment from "moment";

/**
 * Creates measurements.
 * @namespace Measurements
 * @class Measurements
 */
class Measurements extends Component {
    state = {page: 1, perPage: 5};

    /** @function handleFirstPageButtonClick
     * @memberof Measurements#
     * sets page in state to 1
     */
    handleFirstPageButtonClick = () => {
        this.setState({page: 1});
    };

    /** @function handleBackButtonClick
     * @memberof Measurements#
     * sets page in state to previous number
     */
    handleBackButtonClick = () => {
        const page = this.state.page - 1;
        this.setState({page: page});
    };

    /** @function handleNextButtonClick
     * sets page in state to next number
     * @memberof Measurements#
     */
    handleNextButtonClick = () => {
        const page = this.state.page + 1;
        this.setState({page: page});
    };

    /** @function handleLastPageButtonClick
     * sets page in state to count of pages
     * @memberof Measurements#
     */
    handleLastPageButtonClick = () => {
        const {measurementsTotal} = this.props;
        const page = Math.ceil(measurementsTotal / this.state.perPage);
        this.setState({page: page});
    };

    /** @function addNewMeasurement
     * opens add measurement dialog
     * @memberof Measurements#
     */
    addNewMeasurement = () => {
        store.dispatch(toggleMeasurementDialog(true));
    };

    /** @function deleteMeasurement
     * deletes measurement
     * @memberof Measurements#
     * @param {String} userId - id of user
     * @param {Date} date - date
     */
    deleteMeasurement = (userId, date) => {
        const {deleteMeasurement} = this.props;
        deleteMeasurement({userId, date});
    };

    /** @function deleteAllMeasurements
     * deletes all measurements for user with userId
     * @memberof Measurements#
     * @param {String} userId - id of user
     */
    deleteAllMeasurements = (userId) => {
        const {deleteAllMeasurements} = this.props;
        deleteAllMeasurements({userId: userId});
    };

    render() {
        const {classes, userId,measurements,measurementsTotal} = this.props;
        const generateMeasurements = (measurement, index) => (
            <div key={index} className="Measurements__measurement">
                <data value={measurement.weight}
                      className="Measurements__weight">{measurement.weight} kg
                </data>
                <time className="Measurements__time">{moment(measurement.date).format('MMMM DD YYYY, HH:mm:ss A')}</time>
                <Button color="primary" variant="contained" className="Measurements__deleteButton"
                        onClick={() => this.deleteMeasurement(userId, measurement.date)}>
                    Delete
                </Button>
            </div>);
        const current = [...measurements];
        const allMeasurements = current
            .slice((this.state.page - 1) * this.state.perPage, this.state.perPage * this.state.page)
            .map(generateMeasurements);

        return (
                <article className="Measurements">
                    <h2 className="Measurements__title">List of Weights</h2>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.addNewMeasurement}
                        className={classes.button}>
                        Add New Entry
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => this.deleteAllMeasurements(userId)}
                        disabled={measurementsTotal === 0}
                        className={classes.button}>
                        Clear
                    </Button>
                    <AddMeasurementDialog userId={userId}/>
                    {allMeasurements}
                    <nav className="Measurements__pagination">
                        <IconButton
                            onClick={this.handleFirstPageButtonClick}
                            disabled={this.state.page === 1}
                            aria-label="First Page">
                            <FirstPageIcon/>
                        </IconButton>
                        <IconButton
                            onClick={this.handleBackButtonClick}
                            disabled={this.state.page === 1}
                            aria-label="Previous Page">
                            <KeyboardArrowLeft/>
                        </IconButton>
                        <IconButton
                            onClick={this.handleNextButtonClick}
                            disabled={measurementsTotal === 0 ||
                            this.state.page === (Math.ceil(measurementsTotal / this.state.perPage))}
                            aria-label="Next Page">
                            <KeyboardArrowRight/>
                        </IconButton>
                        <IconButton
                            onClick={this.handleLastPageButtonClick}
                            disabled={measurementsTotal === 0 ||
                            this.state.page === (Math.ceil(measurementsTotal / this.state.perPage))}
                            aria-label="Last Page">
                            <LastPageIcon/>
                        </IconButton>
                    </nav>
                </article>
        );
    }
}

export default Measurements;
