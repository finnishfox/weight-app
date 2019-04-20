/**
 * create action to add measurement
 * @memberof module:Measurements#
 * @param {object} payload
 * @param {string} payload.userId - id of user
 * @param {string} payload.weight - weight of user
 * @param {Date} payload.date - date of measurement
 * @returns {{type: string, payload: *}}
 */
export const addMeasurement = payload => ({
    type: 'ADD_MEASUREMENT',
    payload,
});

/**
 * create action to delete measurement
 * @memberof module:Measurements#
 * @param {object} payload
 * @param {string} payload.userId - id of user
 * @param {Date} payload.date - date of measurement
 * @returns {{type: string, payload: *}}
 */
export const deleteMeasurement = payload => ({
    type: 'DELETE_MEASUREMENT',
    payload,
});

/**
 * create action to delete all measurements of user
 * @memberof module:Measurements#
 * @param {object} payload
 * @param {string} payload.userId - id of user
 * @returns {{type: string, payload: *}}
 */
export const deleteAllMeasurements = payload => ({
    type: 'DELETE_ALL_MEASUREMENTS',
    payload,
});
