import React, {Component} from 'react';
import Chart from 'chart.js';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import './Graph.scss';
import {sortDates} from '../../utils/SortDates';

/**
 * Creates graph.
 * @namespace Graph
 * @class Graph
 */
class Graph extends Component {
    state = {currentRange: 'month'};

    conf = {
        'year': {
            unit: 'month',
            sub: 'years'
        },
        'month': {
            unit: 'week',
            sub: 'months'
        },
        'week': {
            unit: 'day',
            sub: 'weeks'
        }
    };

    /** @function getMinDate
     * @memberof Graph#
     * @param {Object[]} measurements - array of measurements
     * @param {string} measurements[].userId - id of user.
     * @param {string} measurements[].weight - weight of user.
     * @param {Date} measurements[].date - date of measurement.
     * @returns min date
     */
    getMinDate = (measurements) => {
        let maxDate = this.getMaxDate(measurements);
        const arrayOfDates = measurements.map(item => item.date);
        arrayOfDates
            .sort((a, b) => sortDates(a,b));
        let date = arrayOfDates[0];
        date = moment(date).subtract(1, 'days');
        if (maxDate === undefined) return undefined;
        const maxMinusWeek = moment(maxDate).subtract(1, 'days').subtract(1, this.conf[this.state.currentRange].sub);
        return date.isBefore(maxMinusWeek) ? maxMinusWeek : date;
    };

    /** @function getMaxDate
     * @memberof Graph#
     * @param {Object[]} measurements - array of measurements
     * @param {string} measurements[].userId - id of user.
     * @param {string} measurements[].weight - weight of user.
     * @param {Date} measurements[].date - date of measurement.
     * @returns max date
     */
    getMaxDate = (measurements) => {
        const arrayOfDates = measurements.map(item => item.date);
        arrayOfDates
            .sort((a,b)=>sortDates(a,b));
        let date = arrayOfDates.slice(-1)[0];
        date = moment(date).add(1, 'days');
        if (date === undefined) return undefined;
        return (date);
    };

    /** @function componentDidMount
     * initializes graph when component did mount
     * @memberof Graph#
     */
    componentDidMount() {
        const {measurements} = this.props;
        const ctx = document.getElementById('myChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'My weight',
                    xAxisID: 'time',
                    yAxisID: 'weight',
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2,
                    pointRadius: 5,
                    backgroundColor: 'rgba(255, 99, 132, .5)',
                    borderColor: 'rgb(255, 99, 132)',
                    data:
                        measurements.map(item => ({x: moment(item.date), y: item.weight})
                        )
                }]
            },
            options: {
                responsive: true,
                aspectRatio: 0,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Weight graph'
                },
                tooltips: {
                    intersect: false,
                    mode: 'index',
                    callbacks: {
                        label: function (tooltipItem, myData) {
                            let label = myData.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += parseFloat(tooltipItem.value).toFixed(2);
                            return label;
                        }
                    }
                },
                scales: {
                    xAxes: [{
                        id: 'time',
                        type: 'time',
                        display: true,
                        distribution: 'linear',
                        time: {
                            min: this.getMinDate(measurements),
                            max: this.getMaxDate(measurements),
                            unit: this.conf[this.state.currentRange].unit,
                        },
                        ticks: {
                            source: 'auto',
                            autoSkip: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Dates'
                        },
                    }],
                    yAxes: [{
                        id: 'weight',
                        type: 'linear',
                        scaleLabel: {
                            display: true,
                            labelString: 'Weight in kgs'
                        },
                    }],
                }
            }
        });
    }

    /** @function componentWillReceiveProps
     * updates graph when component receive new props
     * @memberof Graph#
     */
    componentWillReceiveProps(nextProps) {
        this.updateGraph(nextProps);
    }

    /** @function updateGraph
     * updates graph
     * @memberof Graph#
     * @param {Object} props
     */
    updateGraph = (props) => {
        this.chart.data.datasets = this.chart.data.datasets.map((dataset) => {

            const updated = props.measurements.map(item => {
                return {x: moment(item.date), y: item.weight}
            }).filter((measurement) => {
                const unit = moment().subtract(1, this.conf[this.state.currentRange].sub);
                return moment(measurement.x).isAfter(unit);
            });
            return {
                ...dataset,
                data: updated,
            }
        });
        this.chart.options.scales.xAxes[0].time.unit = this.conf[this.state.currentRange].unit;
        this.chart.options.scales.xAxes[0].time.min = this.getMinDate(props.measurements);
        this.chart.options.scales.xAxes[0].time.max = this.getMaxDate(props.measurements);

        this.chart.update();
    };


    /** @function setRange
     * updates graph and updates currentRange in state
     * @memberof Graph#
     * @param {String} range - dates range
     */
    setRange = (range) => {
        this.setState({currentRange: range}, ()=>this.updateGraph(this.props));
    };

    /** @function setWeek
     * sets range to week
     */
    setWeek = () => {
        this.setRange('week')
    };

    render() {
        return (
            <div className="Graph">
                <Button color="primary" variant={this.state.currentRange === 'week' ? 'outlined' : 'text'}
                        onClick={this.setWeek}>
                    Week
                </Button>
                <Button color="primary" variant={this.state.currentRange === 'month' ? 'outlined' : 'text'}
                        onClick={() => {
                            this.setRange('month')
                        }}>
                    Month
                </Button>
                <Button color="primary" variant={this.state.currentRange === 'year' ? 'outlined' : 'text'}
                        onClick={() => {
                            this.setRange('year')
                        }}>
                    Year
                </Button>
                <canvas height="100%" width="100%" id="myChart"/>
            </div>
        );
    }
}

export default Graph;