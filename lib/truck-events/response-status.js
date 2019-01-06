'use strict';

// For some reason I got duplicated responses from trucks;
// Therefore I update only once in 500ms to avoid excessive load
const throttle = Object.create(null);


module.exports = Truck => ({ payload }) => {
    const { driverId, status } = payload;
    const lastUpdated = throttle[driverId];
    if (lastUpdated > (Date.now() - 500)) return;
    throttle[driverId] = Date.now();
    console.log('response status', payload);

    Truck
        .findOneAndUpdate({ driverId }, { $set: { status } })
        .exec()
        .then(() => console.log(`Updated ${driverId}`))
        .catch(console.error);
};
