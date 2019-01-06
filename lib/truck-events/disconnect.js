'use strict';

module.exports = (Truck, driverId) => () => {
    console.log(`Driver ${driverId} disconnected`);
    const query = {
        driverId,
    };
    const notActiveData = {
        driverId,
        isConnected: false,
        updatedAt: new Date(),
    };
    Truck
        .findOneAndUpdate(query, notActiveData, { upsert: true })
        .exec();
};
