'use strict';

// An endpoint that receive coordinates and return the closest BoB truck to that coordinates.
const {makeGeoJson} = require('../utils');

module.exports = Truck => async (req, res) => {
    const geoJsonData = makeGeoJson(req.body);
    try {
        const nearestTruck = await Truck.findOne({
            location: {
                $nearSphere: {
                    $geometry: geoJsonData,
                },
            },
        });
        res.status(200).json(nearestTruck);
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};
