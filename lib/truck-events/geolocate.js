'use strict';

const { makeGeoJson } = require('../utils');

module.exports = Truck => async ({ payload }) => {
    const { driverId } = payload;
    const geoJsonData = makeGeoJson(payload);

    Truck
        .findOneAndUpdate({ driverId }, { $set: { location: geoJsonData } })
        .exec()
        .then(() => console.log(`Updated location of ${driverId}`))
        .catch(console.error);
};
