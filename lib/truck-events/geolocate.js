'use strict';

module.exports = Truck => async ({ payload }) => {
    const { driverId, lat, lng } = payload;
    const geoJsonData = {
        type: 'Point',
        coordinates: [lng, lat],
    };

    Truck
        .findOneAndUpdate({ driverId }, { $set: { location: geoJsonData } })
        .exec()
        .then(() => console.log(`Updated location of ${driverId} to lat=${lat} lng=${lng}`))
        .catch(console.error);
};
