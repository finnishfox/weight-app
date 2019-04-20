/**
 * create action to open or close dialog
 * @namespace @memberof module:AddMeasurementDialog
 * @param {boolean} payload - true to open dialog, false to close
 * @returns {{type: string, payload: true | false}} - action that ready to dispatch
 */
const toggleMeasurementDialog = payload =>({
    type: 'TOGGLE_MEASUREMENT_DIALOG',
    payload: payload,
});

export default toggleMeasurementDialog;
